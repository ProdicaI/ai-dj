let song = "";
let leftWristX = 0;
let leftWristY = 0;
let rightWristX = 0;
let rightWristY = 0;
let scoreLeftWrist = 0;
let scoreRightWrist = 0;

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

  fill("#FF0000");
  stroke("#FF0000");

  if (scoreRightWrist > 0.2) {
    circle(rightWristX, rightWristY, 20);

    if (rightWristY > 0 && rightWristY <= 100) {
      document.getElementById("speed").innerHTML = "Speed: 0.5x";
      song.rate(0.5);
    } else if (rightWristY > 100 && rightWristY <= 200) {
      document.getElementById("speed").innerHTML = "Speed: 1x";
      song.rate(1);
    } else if (rightWristY > 200 && rightWristY <= 300) {
      document.getElementById("speed").innerHTML = "Speed: 1.5x";
      song.rate(1.5);
    } else if (rightWristY > 300 && rightWristY <= 400) {
      document.getElementById("speed").innerHTML = "Speed: 2x";
      song.rate(2);
    } else if (rightWristY > 400 && rightWristY <= 500) {
      document.getElementById("speed").innerHTML = "Speed: 2.5x";
      song.rate(2.5);
    }
  }

  if (scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);

    let inNumberLeftWristY = Number(leftWristY);
    let removeDecimals = Math.floor(inNumberLeftWristY);
    let volume = removeDecimals / 500;
    document.getElementById("volume").innerHTML = `Volume: ${volume}`;
    song.setVolume(volume);
  }
}

function play() {
  song.play();

  song.setVolume(1);
  song.rate(1);
}
