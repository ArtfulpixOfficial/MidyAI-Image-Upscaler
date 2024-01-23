import { Button } from "./Button";

const UpscaleOptions = function ({
  targetUpscale,
  image,
  handleTargetUpscale,
  handleSubmit,
}) {
  const upscaleOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="upscaling-options-bar">
      <div className="target-dimensions-options">
        {upscaleOptions.map((option) => (
          <span
            key={option}
            className={`X${option} ${option === targetUpscale ? "active" : ""}`}
            onClick={() => {
              if (option !== targetUpscale) handleTargetUpscale(option);
            }}
          >
            x{option}
          </span>
        ))}
      </div>
      <Button
        className="upscale-btn"
        onClick={handleSubmit}
        disabled={image ? false : true}
      >
        Upscale
      </Button>
    </div>
  );
};
export default UpscaleOptions;
