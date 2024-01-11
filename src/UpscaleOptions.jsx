import { Button } from "./Button";

const UpscaleOptions = function ({
  targetUpscale,
  strategy,
  image,
  handleTargetUpscale,
  handleStrategy,
  handleSubmit,
}) {
  const strategyOptions = ["smooth", "detailed"];
  const upscaleOptions = [2, 4, 8, 16];
  return (
    <div className="upscaling-options-bar">
      <div className="strategy-options">
        {strategyOptions.map((option) => (
          <span
            key={option}
            className={`${option} ${option === strategy ? "active" : ""}`}
            onClick={() => {
              if (option !== strategy) handleStrategy(option);
            }}
          >
            {option}
          </span>
        ))}
      </div>
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
