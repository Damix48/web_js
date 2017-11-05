let radius = 150;
let a = 0;
let r;
let v = 0;

function setup() {
  createCanvas(600, 600);
  a = PI / 2;


}

function draw() {
  background(51);
  translate(width / 2, height / 2);
  rotate(-PI / 2);
  fill(255);
  // ellipseMode(CENTER);
  // ellipse(10, -10, 5, 5);
  // ellipse(0, 0, 10, 10);
  rotate(PI);
  for (var i = 3; i < 10; i++) {
    push();
    polygon(i);
    pop();
  }
  v += 0.05;
}

function polygon(n) {
  strokeWeight(2);
  stroke(255);
  noFill();

  rotate(PI / n);
  r = (radius / sin(PI / n)) / 2;

  // ellipse(r * cos(TWO_PI * v / n), r * sin(TWO_PI * v / n), 10);
  // ellipse(0, r * sin(TWO_PI * v / n), 10);
  // ellipse(r * cos(TWO_PI * v / n), 0, 10);


  beginShape();
  for (let i = 1; i <= n; i++) {
    // ellipse(r * cos(TWO_PI * i / n), r * sin(TWO_PI * i / n), 10, 10);
    vertex(r * cos(TWO_PI * i / n), r * sin(TWO_PI * i / n));
  }
  endShape(CLOSE);
}