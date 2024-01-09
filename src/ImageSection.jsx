import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export function ImageSection({ image, newImage }) {
  const imageUrl = URL.createObjectURL(image);
  console.log(imageUrl);
  console.log(newImage);
  return (
    <section className="imageSection">
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={imageUrl} alt="Image one" />}
        itemTwo={<ReactCompareSliderImage src={newImage} alt="Image two" />}
        transition="1s ease-in-out"
        style={{
          width: "635px",
          height: "635px",
        }}
      />
    </section>
  );
}
