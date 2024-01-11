import { useState } from "react";
import { Main } from "./Main";
import { Navbar } from "./Navbar";

export function ImageToText() {
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const [targetUpscale, setTargetUpscale] = useState(2);
  const [strategy, setStrategy] = useState("smooth");

  function handleTargetUpscale(value) {
    setTargetUpscale(value);
  }
  function handleStrategy(value) {
    setStrategy(value);
  }
  const reset = function () {
    setImage(null);
    setNewImage(null);
    setTargetUpscale(2);
    setStrategy("smooth");
  };
  return (
    <>
      <Navbar image={image} newImage={newImage} reset={reset} />
      <Main
        image={image}
        newImage={newImage}
        setImage={setImage}
        setNewImage={setNewImage}
        targetUpscale={targetUpscale}
        handleTargetUpscale={handleTargetUpscale}
        strategy={strategy}
        handleStrategy={handleStrategy}
      ></Main>
    </>
  );
}
