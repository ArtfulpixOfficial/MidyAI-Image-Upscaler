import { Button } from "./Button";

export function Navbar({ image, newImage, setNewImage }) {
  const handleDownload = function () {
    if (!newImage) return;
    console.log(newImage);
    const link = document.createElement("a");
    link.href = newImage;
    link.download = "generated_image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <nav className={newImage ? "searchNav" : "normal"}>
      {newImage ? (
        <>
          <Button
            className="btnBack show"
            onClick={() => {
              setNewImage(null);
            }}
          >{`< Back`}</Button>
          <Button
            className="btnDownload show"
            onClick={handleDownload}
            disabled={!image || image === "sample.jpg" ? true : false}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 19L21 19V21L3 21V19ZM13 9L20 9L12 17L4 9L11 9V1L13 1L13 9Z"
                fill="currentColor"
              ></path>
            </svg>
            Download
          </Button>
        </>
      ) : null}
    </nav>
  );
}
