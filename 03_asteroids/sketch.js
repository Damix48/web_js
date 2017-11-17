let ship;
let asteroids = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 2; i++) {
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
  for (let i = 0; i < asteroids.length; i++) {
    // console.log("i: " + i);
    for (let k = 0; k < asteroids.length; k++) {
      // console.log("k: " + k);

      if (k != i) {
        if (asteroids[i].collide(asteroids[k])) {
          console.log("Auch");
          asteroids[k].inv();
        }
      }
    }
  }

  for (let i = 0; i < asteroids.length; i++) {
    for (let k = 0; k < asteroids[i].absolutePos().length; k++) {
      push();
      fill(255, 50);
      stroke(255);
      strokeWeight(2);
      beginShape();
      let p_ = asteroids[i].absolutePos()[k];
      vertex(p_.x, p_.y);
      // }
      endShape(CLOSE);
      pop();
    }

  }


  if (ship.qBoost > 30) {
    stroke(255);
  } else {
    stroke(255, 50);
  }
  strokeWeight(5);
  line(width, height, width, map(ship.qBoost, 0, 180, height, 0));

  // noLoop();
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
  if (keyCode == 90) {
    // ship.setEngine(true);
    ship.setBoost(true);
  }

  //add boost clicking 'z'
}

function keyReleased() {
  if (keyCode == UP_ARROW) {
    ship.setEngine(false);
  } else if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
    ship.setSteer(0);
  } else if (keyCode == 90) {
    ship.setBoost(false);
    // ship.setEngine(false);
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
    this.qSpeed = 0.1;
    this.boost = false;
    this.qBoost = 180;
  }

  update() {
    this.steer();
    this.speedUp();
    this.addBoost();
    this.edges();
    // console.log(this.qBoost);
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

  accelerate() {
    let force_ = p5.Vector.fromAngle(this.angle);
    force_.mult(this.qSpeed);
    this.speed.add(force_);
  }

  speedUp() {
    if (this.boost) {
      if (this.qBoost > 0) {
        this.qSpeed = 0.3;
        this.qBoost--;
      } else {
        this.qSpeed = 0.1;
        this.boost = false;
      }
      this.accelerate();
    } else if (this.engine) {
      this.qSpeed = 0.1;
      this.accelerate();
    }
    this.pos.add(this.speed);
    this.speed.mult(0.97);
  }

  setBoost(state_) {
    if (this.qBoost > 30) {
      this.boost = state_;
    } else if (!state_) {
      this.boost = state_;
    }
  }

  addBoost() {
    if (this.qBoost < 180) {
      this.qBoost += 0.1;
    }
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
    this.r = random(35, 80);
    this.sides = floor(random(5, 12));

    let speed_ = p5.Vector.random2D();
    this.speed = speed_.mult(random(1.5, 3));

    this.qAngle = random(-0.05, 0.15) * 0.1;
    this.angle = 0;

    this.offsets = [];
    for (var i = 0; i < this.sides; i++) {
      this.offsets[i] = random(15, 45);
    }
    this.path = this.createPath();

  }

  createPath() {
    let path_ = [];
    for (let i = 1; i <= this.sides; i++) {
      let angle_ = TWO_PI * (i - 2) / this.sides;
      let x_ = this.r * cos(angle_) + this.offsets[i];
      let y_ = this.r * sin(angle_) + this.offsets[i];
      path_.push(createVector(x_, y_));
    }

    return path_;
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
    for (var i = 0; i < this.path.length; i++) {
      let p_ = this.path[i];
      vertex(p_.x, p_.y);
    }
    endShape(CLOSE);
    pop();
  }

  collide(asteroid_) {
    let hit = collidePolyPoly(this.absolutePos(), asteroid_.absolutePos(), true);

    return hit;
  }

  absolutePos() {
    let asbP = [];
    for (let i = 0; i < this.path.length; i++) {
      asbP.push(this.path[i].copy().rotate(this.angle).add(this.pos));
    }
    return asbP;
  }

  inv() {
    this.speed.mult(-1);
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