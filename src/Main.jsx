import { clipBoardAPI } from "./api";
import { ImageSection } from "./ImageSection";
import { Message } from "./Message";
import UploadFile from "./UploadFile";
import UpscaleOptions from "./UpscaleOptions";

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
  const handleSubmit = function () {
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
