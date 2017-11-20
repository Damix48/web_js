let t;
let h;

function setup() {
  createCanvas(windowWidth, windowHeight);
  t = new Trapeze();
  h = new Hexagon();

}


function draw() {
  background(51);
  // t.show();
  // t.update();
  h.show();

}

class Trapeze {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.radius = 150;
    // this.path = this.createPath();
  }

  createPath() {
    let t_ = [];
    t_[0] = createVector(this.radius * cos(TWO_PI * 1 / 6), this.radius * sin(TWO_PI * 1 / 6));
    t_[1] = createVector(this.radius * cos(TWO_PI * 2 / 6), this.radius * sin(TWO_PI * 2 / 6));
    t_[2] = createVector((this.radius - 20) * cos(TWO_PI * 2 / 6), (this.radius - 20) * sin(TWO_PI * 2 / 6));
    t_[3] = createVector((this.radius - 20) * cos(TWO_PI * 1 / 6), (this.radius - 20) * sin(TWO_PI * 1 / 6));

    return t_;
  }

  show() {
    // translate(this.pos.x, this.pos.y); // da mettere nell'esagono quando mostra i pezzi
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
    this.trapeze = this.createHexa();
    this.set = [true, false, true, false, true, false]
  }

  createHexa() {
    let t_ = [];
    for (let i = 0; i < 6; i++) {
      t_.push(new Trapeze());
    }
    return t_;
  }

  show() {
    noStroke();
    fill(255, 150);
    translate(width / 2, height / 2);
    // push();
    for (let i = 0; i < this.trapeze.length; i++) {
      rotate(TWO_PI / 6);
      if (this.set[i]) {
        this.trapeze[i].show();
        this.trapeze[i].update();
      }
    }
    // pop();
  }
}