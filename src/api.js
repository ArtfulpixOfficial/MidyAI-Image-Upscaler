const gettingStatusOfTask = async function (taskId) {
  let taskStatus = "Not even started";

  const checkStatus = async function () {
    const { status } = await fetch(
      `https://clipdrop-api.co/async-tasks/v1/task-status/${taskId}`,
      {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      }
    ).then((res) => res.json());
    taskStatus = status;
    if (status === "completed") {
      clearInterval(statusInterval);
      return taskStatus;
    }
  };
  const statusInterval = setInterval(checkStatus, 10000);
  while (taskStatus !== "completed") {
    await checkStatus();
  }
  return taskStatus;
};

export async function clipBoardAPI(file) {
  console.log(file);

  // Making The body of the request
  const form = new FormData();
  form.append("image_file", file);
  form.append("target_width", 1024);
  form.append("target_height", 1024);
  form.append("strategy", "detailed");

  // Sending the post request to the api
  const {
    taskId: { value: taskId },
  } = await fetch(process.env.REACT_APP_API_URL, {
    method: "POST",
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
    body: form,
  }).then((res) => res.json());

  console.log("Task Id is: " + taskId);

  // Getting status of my uploaded Image
  const result = await gettingStatusOfTask(taskId);

  console.log(`upscaling of your file is ${result}`);

  const { downloadUrl: imageURL } = await fetch(
    `https://clipdrop-api.co/async-tasks/v1/result/${taskId}`,
    {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    }
  ).then((res) => res.json());

  console.log(imageURL);
  return imageURL;
}
