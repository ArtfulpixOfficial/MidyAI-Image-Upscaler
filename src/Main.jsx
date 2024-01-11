import { useState } from "react";
import { clipBoardAPI } from "./api";
import { ImageSection } from "./ImageSection";
import { Message } from "./Message";
import UploadFile from "./UploadFile";
import UpscaleOptions from "./UpscaleOptions";
import { Hourglass } from "react-loader-spinner";

export function Main({
  image,
  newImage,
  setImage,
  setNewImage,
  targetUpscale,
  strategy,
  handleTargetUpscale,
  handleStrategy,
}) {
  const [isloading, setIsLoading] = useState(false);
  const handleSubmit = function () {
    setIsLoading((v) => !v);
    const originalImage = image;
    const reader = new FileReader();
    reader.onload = function (e) {
      const image = new Image();
      image.onload = async function () {
        const { width, height } = {
          width: image.width,
          height: image.height,
        };
        const newImageURL = await clipBoardAPI(originalImage, width, height);
        setNewImage(newImageURL);
        setIsLoading((v) => !v);
      };

      image.src = e.target.result;
    };

    reader.readAsDataURL(originalImage);
  };

  async function onFileChange(file) {
    setImage(file);
  }

  return (
    <main>
      {newImage ? (
        <ImageSection image={image} newImage={newImage} />
      ) : isloading ? (
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#fff", "#424b5a"]}
        />
      ) : (
        <>
          {!image ? (
            <>
              <Message />
              <UploadFile onFileChange={onFileChange} />
            </>
          ) : (
            <img
              src={URL.createObjectURL(image)}
              alt="originalImage"
              className="original-image"
            />
          )}
          <UpscaleOptions
            image={image}
            strategy={strategy}
            targetUpscale={targetUpscale}
            handleStrategy={handleStrategy}
            handleTargetUpscale={handleTargetUpscale}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </main>
  );
}
