let r = 80; //150
let c = 0;
let number = 70; //16

let poly = [];
let dots = [];


function setup() {
  // canvas = createCanvas(800, 800);
  canvas = createCanvas(windowWidth, windowHeight);
  // a = 0;
}

function draw() {
  let px = (windowWidth - width) / 2;
  let py = (windowHeight - height) / 2;
  canvas.position(px, py);
  background(51);
  translate(width / 2, height / 2);
  rotate(-PI / 2);
  fill(255);

  rotate(-PI);

  poly = [];
  for (var i = 3; i < number; i++) {
    poly.push(new Polygon(i));
  }

  if (frameCount == 1) {
    for (var i = 0; i < poly.length; i++) {
      let path_ = poly[i].path;
      dots.push(new Dots(path_));
    }
  }

  for (var i = 0; i < poly.length; i++) {
    push();
    poly[i].show();
    pop();
  }

  for (var i = 0; i < dots.length; i++) {
    push();
    dots[i].update();
    dots[i].show();
    pop();
  }


  if (c == 255) {
    l = -1;
  } else if (c == 0) {
    l = 1;
  }
  c = c + l;
  // if (frameCount > 200) {
  //   noLoop();

  // }
}

class Polygon {

  constructor(n_) {
    let r_ = (r / sin(PI / n_)) / 2;
    let a_ = PI / n_;

    this.sides = n_;
    this.radius = r_;
    this.angle = a_;
    this.path = this.createPath();
  }

  createPath() {
    let path_ = [];
    for (let i = 1; i <= this.sides; i++) {
      let x_ = this.radius * cos(TWO_PI * (i - 2) / this.sides);
      let y_ = this.radius * sin(TWO_PI * (i - 2) / this.sides);
      path_.push(createVector(x_, y_));
    }

    return path_;
  }

  show() {
    this.stylize();

    beginShape();
    for (let i = 0; i < this.path.length; i++) {
      let p_ = this.path[i];
      vertex(p_.x, p_.y);
    }
    endShape(CLOSE);
  }

  stylize() {
    rotate(this.angle);
    colorMode(HSB);
    strokeWeight(2);
    stroke(this.colorize());
    noFill();
  }

  colorize() {
    return color(35 + c * 0.9 * map(this.sides, 0, 14, 0, 1), 50, 200);
  }
}

class Dots {
  constructor(path_) {
    let sides_ = path_.length;
    let a_ = PI / (sides_);
    let speed_ = (((number - sides_) / 2 * (sides_)) / 1000);
    let position_ = path_[0];

    this.positionT = position_;
    this.position = position_;
    this.speed = speed_;
    this.angle = a_;
    this.path = path_;
    this.sides = sides_;
    this.index = 0;
  }

  update() {
    let temp_ = ((((number - this.sides + 1) / 2 * (this.sides)) / 1000) * frameCount + 0.5) % 1;

    if (this.speed > temp_) {
      this.index = (this.index + 1) % (this.sides);
      this.positionT = this.path[this.index];
    }

    this.speed = temp_;
    let pos_ = p5.Vector.lerp(this.positionT, this.path[(this.index + 1) % this.sides], this.speed);

    this.position = pos_;
  }

  show() {
    this.stylize();

    let pos_ = this.position;
    ellipse(pos_.x, pos_.y, 15, 15);
  }

  stylize() {
    rotate(this.angle);
    strokeWeight(2);
    stroke(255);
    fill(255, c);
  }

  // colorize() {
  //   return color(35 + c * 0.9 * map(this.sides, 0, 14, 0, 1), 50, 200);
  // }

}
