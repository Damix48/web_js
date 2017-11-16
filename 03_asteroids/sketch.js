let ship;
let asteroids = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 10; i++) {
    asteroids.push(new Asteroid);
  }
  // asteroid = new Asteroid();
}

function draw() {
  background(51);
  ship.show();
  ship.update();

  for (var i = 0; i < asteroids.length; i++) {
    asteroids[i].show();
    asteroids[i].update();
  }

}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    ship.setEngine(true);
    console.log("UP");
  }
  if (keyCode == RIGHT_ARROW) {
    ship.setSteer(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setSteer(-0.1);
  }

  //add boost clicking 'z'
}

function keyReleased() {
  if (keyCode == UP_ARROW) {
    ship.setEngine(false);
  } else if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
    ship.setSteer(0);
  }

}

class Ship {
  constructor() {

    this.pos = createVector(windowWidth / 2, windowHeight / 2);
    this.side = 15;
    this.qSteer = 0;
    this.angle = 0;

    this.engine = false;
    this.speed = createVector(0, 0);
  }

  update() {
    this.steer();
    this.speedUp();
    this.edges();
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle + PI / 2);
    noFill();
    stroke(255);
    strokeWeight(2);
    triangle(-this.side, this.side, this.side, this.side, 0, -this.side);
    pop();
  }

  steer() {
    this.angle += this.qSteer;
  }

  setSteer(angle_) {
    this.qSteer = angle_;
  }

  setEngine(state_) {
    this.engine = state_;
  }

  setSpeed() {
    let force_ = p5.Vector.fromAngle(this.angle);
    force_.mult(0.1);
    this.speed.add(force_);
  }

  speedUp() {
    if (this.engine) {
      this.setSpeed();
    }
    this.pos.add(this.speed);
    this.speed.mult(0.97);
  }

  edges() {
    if (this.pos.x > width) { //right->left
      this.pos.x = 0;
    } else if (this.pos.x < 0) { //left->right
      this.pos.x = width;
    }
    if (this.pos.y > height) { //bottom->top
      this.pos.y = 0;
    } else if (this.pos.y < 0) { //top->bottom
      this.pos.y = height;
    }
  }
}

class Asteroid {
  constructor() {

    this.pos = createVector(random(width), random(height));
    this.r = random(20, 80);
    this.sides = floor(random(5, 12));

    let speed_ = p5.Vector.random2D();
    this.speed = speed_.mult(random(1.5, 3));

    this.qAngle = random(-0.05, 0.15) * 0.1;
    this.angle = 0;

    this.offsets = [];
    for (var i = 0; i < this.sides; i++) {
      this.offsets[i] = random(0, 35);
    }

  }

  update() {
    this.angle += this.qAngle;
    this.pos.add(this.speed);

    this.edges();
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    fill(255, 50);
    stroke(255);
    strokeWeight(2);
    beginShape();
    for (var i = 0; i < this.sides; i++) {
      let angle_ = TWO_PI * (i - 2) / this.sides;
      vertex(this.r * cos(angle_) + this.offsets[i], this.r * sin(angle_) + this.offsets[i]);
    }
    endShape(CLOSE);
    pop();
  }

  edges() {
    if (this.pos.x > width) { //right->left
      this.pos.x = 0;
    } else if (this.pos.x < 0) { //left->right
      this.pos.x = width;
    }
    if (this.pos.y > height) { //bottom->top
      this.pos.y = 0;
    } else if (this.pos.y < 0) { //top->bottom
      this.pos.y = height;
    }
  }
}