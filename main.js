let song = "";
let leftWristX = 0;
let leftWristY = 0;
let rightWristX = 0;
let rightWristY = 0;

function preload() {
  song = loadSound("./music.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);

  video.hide();

  poseNet = ml5.poseNet(video, () => console.log("Model loaded."));

  poseNet.on("pose", (res) => {
    if (res.length > 0) {
      console.log(res);

      scoreRightWrist = res[0].pose.keypoints[10].score;
      console.log(`Score right wrist: ${scoreRightWrist}`);

      scoreLeftWrist = res[0].pose.keypoints[9].score;
      console.log(`Score left wrist: ${scoreLeftWrist}`);

      leftWristX = res[0].pose.leftWrist.x;
      leftWristY = res[0].pose.leftWrist.y;
      console.log(`Left wrist X: ${leftWristX}\nLeft wrist Y: ${leftWristY}`);

      rightWristX = res[0].pose.rightWrist.x;
      rightWristY = res[0].pose.rightWrist.y;
      console.log(
        `Right wrist X: ${rightWristX}\nRight wrist Y: ${rightWristY}`
      );
    }
  });
}

function draw() {
  image(video, 0, 0, 600, 500);
}
