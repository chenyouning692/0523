let video;
let facemesh;
let predictions = [];
const points = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];

function setup() {
  createCanvas(640, 180); // 設定畫布大小
  video = createCapture(VIDEO); // 啟用電腦鏡頭
  video.size(640, 480); // 設定鏡頭影像大小
  video.hide(); // 隱藏原始的 HTML 元素，只顯示在畫布上

  // 初始化 facemesh 模型
  facemesh = ml5.facemesh(video, modelReady);

  // 當 facemesh 偵測到臉部時，更新 predictions
  facemesh.on("predict", (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model ready!");
}

function draw() {
  background(220);
  translate((width - video.width) / 2, (height - video.height) / 2); // 將畫布置中
  image(video, 0, 0, video.width, video.height); // 在畫布上顯示鏡頭影像

  // 繪製臉部點和連接線
  drawFacemesh();
}

function drawFacemesh() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    stroke(255, 0, 0); // 設定線條顏色為紅色
    strokeWeight(15); // 設定線條粗細為 15
    noFill();

    beginShape();
    for (let i = 0; i < points.length; i++) {
      const [x, y] = keypoints[points[i]];
      vertex(x, y); // 繪製點
    }
    endShape(CLOSE); // 將線條連接成封閉形狀
  }
}
