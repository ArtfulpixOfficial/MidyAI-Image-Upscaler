import { clipBoardAPI } from "./api";
import { ImageSection } from "./ImageSection";
import { Message } from "./Message";
import UploadFile from "./UploadFile";

export function Main({ image, newImage, setImage, setNewImage }) {
  async function onFileChange(file) {
    setImage(file);
    await clipBoardAPI(file);
    const newImageURL = await clipBoardAPI(file);
    console.log(newImageURL);
    setNewImage(newImageURL);
  }

  return (
    <main>
      {newImage ? (
        <ImageSection image={image} newImage={newImage} />
      ) : (
        <>
          <Message />
          <UploadFile onFileChange={onFileChange} />
        </>
      )}
    </main>
  );
}
