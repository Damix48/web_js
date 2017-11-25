let t;
let h;

function setup() {
  createCanvas(windowWidth, windowHeight);
  t = new Trapeze(2);
  h = new Hexagon();

}


function draw() {
  background(51);
  // t.show();
  // t.update();
  h.show();
  // t.show();
  // noLoop();
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
    t_[0] = createVector(this.radius * cos(TWO_PI * this.i / 7), this.radius * sin(TWO_PI * this.i / 7));
    t_[1] = createVector(this.radius * cos(TWO_PI * (this.i + 1) / 7), this.radius * sin(TWO_PI * (this.i + 1) / 7));
    t_[2] = createVector((this.radius - 30) * cos(TWO_PI * (this.i + 1) / 7), (this.radius - 30) * sin(TWO_PI * (this.i + 1) / 7));
    t_[3] = createVector((this.radius - 30) * cos(TWO_PI * this.i / 7), (this.radius - 30) * sin(TWO_PI * this.i / 7));

    return t_;
  }

  show() {
    // translate(this.pos.x, this.pos.y); // da mettere nell'esagono quando mostra i pezzi
    noStroke();
    fill(255, 150);
    beginShape();
    for (let i = 0; i < 4; i++) {
      let p_ = this.createPath()[i];
      vertex(p_.x, p_.y);
    }
    endShape(CLOSE);
  }

  update() {
    if (this.radius > 30) {
      this.radius -= 0.5;
    }
  }

}

class Hexagon {
  constructor() {
    this.set = [false, true, true, true, true, false, true];
    this.trapeze = this.createHexa();
  }

  createHexa() {
    let t_ = [];
    for (let i = 0; i < this.set.length; i++) {
      if (this.set[i]) {
        console.log("lol");
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
    for (let i = 0; i < this.trapeze.length; i++) {
      // console.log("ciao");
      // rotate(TWO_PI / 6);
      if (this.set[i]) {
        this.trapeze[i].show();
        this.trapeze[i].update();
      }
    }
    // pop();
  }
}