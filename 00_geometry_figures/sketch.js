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
let canvas;
let b = 0;

function setup() {
  canvas = createCanvas(600, 600);
  a = 0;
}

let ind = 0;
let innn = 0;

function draw() {
  let px = (windowWidth - width) / 2;
  let py = (windowHeight - height) / 2;
  canvas.position(px, py);
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

  b++;
}

function polygon(n) {
  // n = 4;
  rotate(PI / n);
  r = (radius / sin(PI / n)) / 2;
  p = [];


  colorMode(HSB);
  strokeWeight(2);
  stroke(35 + c * 0.9 * map(n, 0, number, 0, 1), 50, 200);
  noFill();
  // n = 4;
  for (let i = 1; i <= n; i++) {
    // p[n] = [];
    let x_ = r * cos(TWO_PI * (i - 2) / n);
    let y_ = r * sin(TWO_PI * (i - 2) / n);
    p.push(createVector(x_, y_));
  }
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
      b = 0;
      // vel[i] = vel[i] * (sin(i * PI / number));
    }
  }

  for (var i = 0; i < ball.length; i++) {
    // for (var k = 0; k < ball.length; k++) {
    //   b[k]++;
    // }
    push()
    rotate(PI / (i + 3));
    let temp = ((((number - i - 2) / 2 * (i + 3)) / 1000) * b + 0.5) % 1;

    // console.log("temp: " + floor(temp * 10));
    // vel[i] = round(temp * 1e12) / 1e12;



    if (vel[i] > temp) {
      // console.log("ciao");
      vel[i] = 0.5;
      index[i] = (index[i] + 1) % [i + 3];
      ball[i] = np[i][index[i]];
      // b = 0;
      // console.log(b);
    }
    vel[i] = temp;

    // console.log(index[i]);
    v1 = p5.Vector.lerp(ball[i], np[i][(index[i] + 1) % (i + 3)], vel[i]);

    strokeWeight(2);
    stroke(255);
    fill(255, c);
    ellipse(v1.x, v1.y, 15, 15);
    pop();
  }

}
