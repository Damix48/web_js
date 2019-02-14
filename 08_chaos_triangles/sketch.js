let points = [];
let last_point;

function setup() {
  createCanvas(800, 800);

  // SETUP TRIANGLE
  for (let i = 0; i < 3; i++) {
    let x = 300 * cos(TWO_PI * i / 3 - PI / 2);
    let y = 300 * sin(TWO_PI * i / 3 - PI / 2);
    points.push(createVector(x, y));
  }

  // ADD FIRST POINT
  let x = lerp(points[0].x, points[1].x, 0.5);
  let y = lerp(points[0].y, points[1].y, 0.5);
  x = random(800);
  y = random(800);
  points.push(createVector(x, y));
}
let n = 1;

function draw() {
  background(51);

  // ADD POINTS
  for (let i = 0; i < 100; i++) {
    let p = p5.Vector.lerp(points[points.length - 1], points[floor(random(3))], 0.5);
    points.push(p);
  }

  // DRAW ALL-1 POINTS
  translate(width / 2, height / 2);
  // scale(n);
  for (let i = 0; i < points.length - 1; i++) {
    const p = points[i];

    stroke(255);
    strokeWeight(1);
    // set(floor(p.x), floor(p.y), color(255));
    point(p.x, p.y);
  }

  // DRAW LAST POINT
  stroke(255, 10, 10);
  strokeWeight(10);
  const p = points[points.length - 1];
  point(p.x, p.y);

  // TEXT
  translate(-width / 2, -height / 2);
  noStroke();
  fill(255);
  textAlign(RIGHT);
  text("POINTS: " + points.length, width - 50, height - 50);
  // n = n + 0.05;
  if (points.length > 100000) {
    noLoop();
  }
}