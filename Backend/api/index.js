require("dotenv").config();
const express = require("express");
const Replicate = require("replicate");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  })
);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.get("/api/convert", (req, res) => {
  res.send("Send post requests to get conversions");
});

app.post("/api/convert", async (req, res) => {
  const replicateApiToken = process.env.SERVER_REPLICATE_API_TOKEN;
  try {
    // console.log(req.body.image_url);
    const replicate = new Replicate({
      auth: replicateApiToken,
    });
    const output = await replicate.run(
      "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
      {
        input: {
          image: req.body.image,
          scale: req.body.targetUpscale,
          face_enhance: true,
        },
      }
    );
    res.json({ result: output });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
