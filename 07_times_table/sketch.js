let N;
let N_min = 10;
let N_max = 300;
let M;
const M_min = 2;
const M_max = 10;
const R = 200;

let points = [];

function setup() {
  createCanvas(800, 800);
  frameRate(5);
}

function draw() {
  background(51);

  M = floor(map(mouseY, 0, height, M_min, M_max, true));
  N = floor(map(mouseX, 0, width, N_min, N_max * M / M_max, true));

  let h = height / (M_max - M_min);
  for (let i = 0; i < M_max - M_min; i++) {
    fill(255, 10 * i);
    noStroke();
    rect(0, i * h, width, h);
    fill(255);
    textAlign(RIGHT);
    text(i + M_min - 1, width - 10, (i + 1) * h - 10);
  }

  translate(width / 2, height / 2);

  points = [];
  for (let i = 0; i < N; i++) {
    let x = R * cos(TWO_PI * i / N);
    let y = R * sin(TWO_PI * i / N);
    let p = createVector(x, y);
    points.push(p);
  }

  for (let i = 0; i < points.length; i++) {
    // POINTS
    stroke(255);
    strokeWeight(5);
    point(points[i].x, points[i].y);

    // LINES
    stroke(255, 150);
    strokeWeight(2);
    line(points[i].x, points[i].y, points[i * M % N].x, points[i * M % N].y);
  }

  // console.log(N);


}