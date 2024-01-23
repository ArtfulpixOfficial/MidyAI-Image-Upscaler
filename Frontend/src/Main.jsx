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
  handleTargetUpscale,
}) {
  const [isloading, setIsLoading] = useState(false);

  async function fileToBase64Url(file) {
    if (!file) return;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        const base64Url = e.target.result;
        resolve(base64Url);
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  const handleSubmit = async function () {
    setIsLoading(true);
    const imageURL = await fileToBase64Url(image);
    const newImageURL = await clipBoardAPI(imageURL, targetUpscale);
    setNewImage(newImageURL);
    setIsLoading(false);
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
            targetUpscale={targetUpscale}
            handleTargetUpscale={handleTargetUpscale}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </main>
  );
}
