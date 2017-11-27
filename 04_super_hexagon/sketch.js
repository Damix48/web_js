let t;
let h;
let b;
let PG;

function setup() {
  createCanvas(windowWidth, windowHeight);
  t = new Trapeze(2);
  h = new Hexagon();
  b = new Background();
  PG = new Triangle();

}


function draw() {
  background(51);
  b.show();
  PG.show();
  PG.update();

  h.show();
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    PG.setSteer(0.07);
  } else if (keyCode == LEFT_ARROW) {
    PG.setSteer(-0.07);
  }
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
    PG.setSteer(0);
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
    translate(width / 2, height / 2);
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
    translate(width / 2, height / 2);
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

}

class Hexagon {
  constructor() {
    this.set = [false, true, true, true, true, false];

    this.trapezes = this.createHexa();
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
    translate(width / 2, height / 2);
    // push();
    for (let i = 0; i < this.trapezes.length; i++) {

      if (this.set[i]) {
        this.trapezes[i].show();
        this.trapezes[i].update();
      }
    }
    // pop();
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
    this.steer();
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);

    rotate(this.angle);

    translate(60, 0);
    rotate(PI / 2);
    noFill();
    stroke(255);
    strokeWeight(2);
    triangle(this.path[0].x, this.path[0].y, this.path[1].x, this.path[1].y, this.path[2].x, this.path[2].y);
    pop();
  }

  steer() {
    this.angle += this.qSteer;
  }

  setSteer(angle_) {
    this.qSteer = angle_;
  }
}