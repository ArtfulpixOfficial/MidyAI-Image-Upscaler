export async function clipBoardAPI(image, targetUpscale = 2) {
  // Making The body of the request
  if (!image) return;
  const { result: imageURL } = await fetch(
    `https://midy-ai-image-upscaler-backend.vercel.app/api/convert`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ image, targetUpscale }),
    }
  ).then((res) => res.json());
  return imageURL;
}
