// Teachable Machine 模型地址
let modelURL = "https://teachablemachine.withgoogle.com/models/gZvJCL7Ru/";

// 全局变量
let classifier;
let video;
let label = "Loading model...";
let confidence = 0;

// 1. 在 preload() 中加载模型
function preload() {
  classifier = ml5.imageClassifier(modelURL + "model.json");
}

// 2. 在 setup() 中初始化摄像头并隐藏原始视频节点
function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  textFont("Arial");
  textSize(24);
  textAlign(CENTER, CENTER);

  classifyVideo();
}

// 3. 在 draw() 中将摄像头画面绘制在画布中心
function draw() {
  background(20);

  imageMode(CENTER);
  image(video, width / 2, height / 2, 640, 480);

  // 显示识别结果
  drawResultPanel();
}

// 循环分类摄像头画面
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// 获取 Teachable Machine 分类结果
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  if (results && results.length > 0) {
    label = results[0].label;
    confidence = results[0].confidence;
  }

  classifyVideo();
}

// 结果显示面板
function drawResultPanel() {
  noStroke();
  fill(0, 160);
  rect(0, height - 80, width, 80);

  fill(255);
  textSize(26);
  text(label, width / 2, height - 50);

  textSize(16);
  text("Confidence: " + nf(confidence * 100, 2, 1) + "%", width / 2, height - 22);
}
