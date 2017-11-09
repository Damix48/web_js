let radius = 120;
let number = 16;

let c = 0;
// let ll = 1;

let a;
let b;
let z = 0;

let canvas;

function setup() {
  canvas = createCanvas((number - 1) * 25 * 2 + 40, (number - 3) * 20 + 20);
  a = [];
  b = [];

}

function draw() {
  let px = (windowWidth - width) / 2;
  let py = (windowHeight - height) / 2;
  canvas.position(px, py);
  background(51);
  translate(20, 20);
  // rotate(-PI / 2);
  fill(255);

  // rotate(PI);
  for (var i = 3; i < number; i++) {
    push();
    polygon(i);
    pop();

  }
  if (frameCount == 1) {
    for (var i = 3; i < number; i++) {
      a[i] = 0;
      b[i] = 0;
    }
  }
  if (c == 255) {
    l = -1;
  } else if (c == 0) {
    l = 1;
  }
  c = c + l;
  if (z < 25) {
    z = lerp(z, 25, 0.1);
  }
}


function polygon(n) {
  // line(0, 0, 10, 10);
  // r = 10 * (radius / sin(PI / n)) / n;
  colorMode(HSB);
  strokeWeight(2);
  stroke(35 + c * 0.9 * map(n, 0, number, 0, 1), 50, 200);
  noFill();

  let y_ = n - 3;
  line(0, y_ * 20, z * n * 2, y_ * 20);

  fill(51);
  if (a[n] > (25 * n * 2)) {

    b[n] = -1;
  } else if (a[n] <= 0) {
    b[n] = 1;
  }
  a[n] = b[n] * (((number - n) / 2 * (n)) / 5) * frameCount % (z * n * 2);
  ellipse(a[n], y_ * 20, 10, 10);
}