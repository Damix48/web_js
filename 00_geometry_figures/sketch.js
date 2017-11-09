let radius = 120;
let a = 0;
let r;
let p;
let target;
let ball = [];
let index = [];
let number = 16;
let speed = 3;
let np = [];
let position;
let c = 0;
let ll = 1;

let v1;
let vtarget;
let vel = [];

function setup() {
  createCanvas(600, 600);
  a = 0;
}

let ind = 0;
let innn = 0;

function draw() {
  background(51);
  translate(width / 2, height / 2);
  rotate(-PI / 2);
  fill(255);

  rotate(-PI);
  for (var i = 3; i < number; i++) {

    push();
    polygon(i);
    pop();

  }

  points();
  // if (frameRate() < 50) {
  //   console.log(frameCount + ", " + frameRate());

  // }
  // console.log(c);
  if (c == 255) {
    l = -1;
  } else if (c == 0) {
    l = 1;
  }
  c = c + l;
  // c++;

  // if (frameCount > number) {
  //   noLoop();

  // }
}

function polygon(n) {
  rotate(PI / n);
  r = (radius / sin(PI / n)) / 2;
  p = [];
  for (let i = 1; i <= n; i++) {
    // p[n] = [];
    let x_ = r * cos(TWO_PI * (i - 2) / n);
    let y_ = r * sin(TWO_PI * (i - 2) / n);
    p.push(createVector(x_, y_));
  }

  colorMode(HSB);
  strokeWeight(2);
  stroke(35 + c * 0.9 * map(n, 0, number, 0, 1), 50, 200);
  noFill();
  beginShape();
  for (let i = 0; i < p.length; i++) {
    // console.log(p[i].x);
    vertex(p[i].x, p[i].y);
  }
  endShape(CLOSE);

  np[n - 3] = p;

}

function points() {

  if (frameCount == 1) {
    for (let i = 0; i < np.length; i++) {
      index[i] = 0;
      ball.push(np[i][index[i]]);
      vel[i] = 0.5;
      // vel[i] = vel[i] * (sin(i * PI / number));
    }
  }

  for (var i = 0; i < ball.length; i++) {
    push()
    rotate(PI / (i + 3));
    let temp = (vel[i] + (((number - i - 2) / 2 * (i + 3)) / 1000));
    // console.log("temp: " + round(temp * 1e12) / 1e12);
    // vel[i] = round(temp * 1e12) / 1e12;
    vel[i] = temp;


    if (vel[i] >= 1) {
      vel[i] = 0;
      index[i] = (index[i] + 1) % [i + 3];
      ball[i] = np[i][index[i]];
    }

    console.log(vel[i]);
    v1 = p5.Vector.lerp(ball[i], np[i][(index[i] + 1) % (i + 3)], vel[i]);

    strokeWeight(2);
    stroke(255);
    fill(255, c);
    ellipse(v1.x, v1.y, 10, 10);
    pop();
  }

}