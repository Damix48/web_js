let points = [];
let n = 0;

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < TWO_PI; i += 0.05) {
    let x = 16 * pow(sin(i), 3);
    let y = 13 * cos(i) - 5 * cos(2 * i) - 2 * cos(3 * i) - cos(4 * i);

    points.push(createVector(20 * x, 20 * y));
  }
  frameRate(1);
}

function draw() {
  background(51);
  translate(width / 2, height / 2 - 70);
  rotate(PI)

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const p_1 = points[(i + 1) % points.length];
    const p_next = points[floor(i * n) % points.length];

    stroke(255, 50);
    strokeWeight(2);
    line(p.x, p.y, p_next.x, p_next.y);

    stroke(255, 111, 97);
    strokeWeight(10);
    point(p.x, p.y);
    strokeWeight(5);
    line(p.x, p.y, p_1.x, p_1.y);
  }

  n++;
  // 0 62 63 64
}