let t;
let hs;
let b;
let PG;

function setup() {
  createCanvas(windowWidth, windowHeight);
  t = new Trapeze(2);
  hs = [];
  hs[0] = new Hexagon();
  b = new Background();
  PG = new Triangle();

}

let angle = 0;

let r_ = false;

function draw() {
  background(51);
  translate(width / 2, height / 2);

  push();
  rotate(angle);
  b.show();
  for (let i = 0; i < hs.length; i++) {
    hs[i].show();
    if (hs[hs.length - 1].isPass()) {
      hs.push(new Hexagon);
    }
  }

  pop();

  // console.log(h.isPass());
  PG.show();
  PG.update();

  angle += 0.01;

  if (keyIsDown(LEFT_ARROW) && !r_) {
    PG.steer(-0.07);
  } else if (keyIsDown(RIGHT_ARROW)) {
    PG.steer(0.07);
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    r_ = true;
  }
  if (keyCode == LEFT_ARROW) {
    r_ = false;
  }
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW) {
    r_ = false;
  }
}

class Background {
  constructor() {
    this.parts = 6;
    this.r = width * 2;
    this.colors = [color(255, 150), color(255, 50), color(255, 150), color(255, 50), color(255, 150), color(255, 50)];
  }

  show() {
    //show hexagon background
    push();
    // translate(width / 2, height / 2);
    for (let i = 0; i < this.parts; i++) {
      noStroke();
      fill(this.colors[i]);
      beginShape();
      vertex(this.r * cos(TWO_PI * i / this.parts), this.r * sin(TWO_PI * i / this.parts));
      vertex(this.r * cos(TWO_PI * (i + 1) / this.parts), this.r * sin(TWO_PI * (i + 1) / this.parts));
      vertex(0, 0);
      endShape(CLOSE);
    }
    pop();

    //show circle 
    push();
    // translate(width / 2, height / 2);
    noStroke();
    fill(255);
    ellipse(0, 0, 80, 80);
    pop();

  }
}

class Trapeze {
  constructor(i_) {
    this.pos = createVector(width / 2, height / 2);
    this.radius = 150;
    this.mRadius = 150;
    this.i = i_;
    this.path = this.createPath();
  }

  createPath() {
    let t_ = [];
    t_[0] = createVector(this.radius * cos(TWO_PI * this.i / 6), this.radius * sin(TWO_PI * this.i / 6));
    t_[1] = createVector(this.radius * cos(TWO_PI * (this.i + 1) / 6), this.radius * sin(TWO_PI * (this.i + 1) / 6));
    t_[2] = createVector((this.radius - 30) * cos(TWO_PI * (this.i + 1) / 6), (this.radius - 30) * sin(TWO_PI * (this.i + 1) / 6));
    t_[3] = createVector((this.radius - 30) * cos(TWO_PI * this.i / 6), (this.radius - 30) * sin(TWO_PI * this.i / 6));

    return t_;
  }

  show() {
    noStroke();
    fill(255, 150);
    beginShape();
    for (let i = 0; i < 4; i++) {
      let p_ = this.path[i];
      vertex(p_.x, p_.y);
    }
    endShape(CLOSE);
  }

  update() {
    if (this.radius > 30) {
      this.radius -= 0.5;
      this.path = this.createPath();
    }
  }

  isPass() {
    if (this.mRadius - 30 == this.radius) {
      return true;
    }
    return false;
  }

}

class Hexagon {
  constructor() {
    this.set = this.createSet();

    this.trapezes = this.createHexa();
  }

  createSet() {
    let t_ = [];
    for (let i = 0; i < 6; i++) {
      if (random() < 0.5) {
        t_.push(true);
      } else {
        t_.push(false);
      }
    }
    return t_;
  }

  createHexa() {
    let t_ = [];
    for (let i = 0; i < this.set.length; i++) {
      if (this.set[i]) {
        t_.push(new Trapeze(i));
      } else {
        t_.push(undefined);
      }

    }
    console.log(t);

    return t_;
  }

  show() {
    noStroke();
    fill(255, 150);
    // translate(width / 2, height / 2);
    // push();
    for (let i = 0; i < this.trapezes.length; i++) {

      if (this.set[i]) {
        this.trapezes[i].show();
        this.trapezes[i].update();
      }
    }
    // pop();
  }

  isPass() {
    for (let i = 0; i < this.trapezes.length; i++) {
      if (this.set[i] && this.trapezes[i].isPass()) {
        return true;
      }
    }
    return false;
  }
}

class Triangle {
  constructor() {
    this.pos = createVector(windowWidth / 2, windowHeight / 2);
    this.side = 8;
    this.angle = 0;
    this.qSteer = 0;

    this.path = [];
    this.path[0] = createVector(-this.side, this.side);
    this.path[1] = createVector(this.side, this.side);
    this.path[2] = createVector(0, -this.side);
  }

  update() {
    // this.steer();
  }

  show() {
    push();
    // translate(this.pos.x, this.pos.y);

    rotate(this.angle);

    translate(60, 0);
    rotate(PI / 2);
    noFill();
    stroke(255);
    strokeWeight(2);
    triangle(this.path[0].x, this.path[0].y, this.path[1].x, this.path[1].y, this.path[2].x, this.path[2].y);
    pop();
  }

  steer(angle_) {
    this.angle += angle_;
  }

  // setSteer(angle_) {
  //   this.qSteer = angle_;
  // }
}