// CIRCLE
let N;
let N_min = 10;
let N_max = 300;
let M;
const M_min = 2;
const M_max = 10;
const R = 300;

// RECTANGLE
let n = 0;

let points = [];

function setup() {
  createCanvas(800, 800);
  // frameRate(5);
}

function circle() {
  M = (map(mouseY, 0, height, M_min, M_max, true));
  // console.log(M);
  N = floor(map(mouseX, 0, width, N_min, N_max, true));

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
    const p = points[i];
    const p_next = points[floor(i * M) % N];

    // POINTS
    stroke(255);
    strokeWeight(5);
    point(points[i].x, points[i].y);

    // LINES
    stroke(255, 150);
    strokeWeight(2);
    line(p.x, p.y, p_next.x, p_next.y);
  }

  // console.log(N);
}

function rectangle() {
  translate(50, 50);

  let lato = 50;

  points = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < lato; j++) {
      let x, y;
      if (i == 0) {
        x = j * 10;
        y = 0;
      } else if (i == 1) {
        x = lato * 10;
        y = j * 10;
      } else if (i == 2) {
        x = (lato - j) * 10;
        y = lato * 10;
      } else if (i == 3) {
        x = 0;
        y = (lato - j) * 10;
      }
      points.push(createVector(x, y));
    }
  }


  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const p_next = points[floor(i * n) % points.length];

    // POINTS
    stroke(255);
    strokeWeight(5);
    point(p.x, p.y);

    // LINES
    stroke(255, 150);
    strokeWeight(2);
    line(p.x, p.y, p_next.x, p_next.y);
  }
  n = n + 0.01;
  fill(255);
  textSize(26);
  text(n.toFixed(1), 10, 600);
}

function draw() {
  background(51);
  circle();
}