let ship;
let asteroids = [];
let lasers = [];
let beginSound;
let gameOverSound;
let laserSound;
let hitSound;

let phase = 0;



function preload() {
  soundFormats('mp3', 'ogg', 'wav');
  beginSound = loadSound('sounds/begin.wav');
  gameOverSound = loadSound('sounds/gameover.wav');
  laserSound = loadSound('sounds/start.wav');
  hitSound = loadSound('sounds/hit3.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid);
  }

  beginSound.play();
  laserSound.setVolume(0.5);
  hitSound.setVolume(0.3);
}

function draw() {
  background(51);
  ship.show();
  ship.update();

  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].show();
    asteroids[i].update();
  }
  for (let i = 0; i < asteroids.length; i++) {

    for (let k = 0; k < asteroids.length; k++) {
      if (k != i) {
        if (asteroids[i].collide(asteroids[k])) {
          console.log("Auch");
          asteroids[k].inv(asteroids[i]);
        }
      }
    }

    if (ship.collide(asteroids[i])) {
      console.log("Hit");
      ship.hit();
    }
  }

  for (let i = 0; i < lasers.length; i++) {
    lasers[i].show();
    lasers[i].update();
    if (lasers[i].edges()) {
      lasers.splice(i, 1);
    }
  }

  for (let i = 0; i < asteroids.length; i++) {
    for (let k = 0; k < lasers.length; k++) {
      if (asteroids[i].isLasered(lasers[k])) {
        hitSound.play();
        ship.pointsUp(asteroids[i].getR());
        console.log("Lasered");
        if (asteroids[i].getR() > 50) {
          asteroids = asteroids.concat(asteroids[i].breakUp());
          asteroids.splice(i, 1);
          lasers.splice(k, 1);
        } else {
          asteroids.splice(i, 1);
          lasers.splice(k, 1);
        }
        break;
      }
    }
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    ship.setEngine(true);
  }
  if (keyCode == RIGHT_ARROW) {
    ship.setSteer(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setSteer(-0.1);
  }
  if (keyCode == 90) {
    ship.setBoost(true);
  }
  if (keyCode == 32) {
    ship.shoot();
  }
}

function keyReleased() {
  if (keyCode == UP_ARROW) {
    ship.setEngine(false);
  } else if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
    ship.setSteer(0);
  } else if (keyCode == 90) {
    ship.setBoost(false);
  }
}

class Ship {
  constructor() {

    this.pos = createVector(windowWidth / 2, windowHeight / 2);
    this.side = 15;
    this.life = 300;
    this.points = 0;

    this.qSteer = 0;
    this.angle = 0;

    this.engine = false;
    this.speed = createVector(0, 0);
    this.qSpeed = 0.1;
    this.boost = false;
    this.qBoost = 180;

    this.path = [];
    this.path[0] = createVector(-this.side, this.side);
    this.path[1] = createVector(this.side, this.side);
    this.path[2] = createVector(0, -this.side);
  }

  update() {
    this.steer();
    this.speedUp();
    this.addBoost();
    this.showStats();
    this.edges();
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle + PI / 2);
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

  shoot() {
    laserSound.play();
    lasers.push(new Laser(this.pos.copy(), this.angle));
  }

  absolutePos() {
    let asbP = [];
    for (let i = 0; i < this.path.length; i++) {
      asbP.push(this.path[i].copy().rotate(this.angle).add(this.pos));
    }
    return asbP;
  }

  collide(target_) {
    let hit = collidePolyPoly(this.absolutePos(), target_.absolutePos(), true);
    return hit;
  }

  hit() {
    if (this.life > 0) {
      this.life -= 1;
    } else {
      gameOverSound.play();
      console.log("GAME OVER");
      this.pos = createVector(width / 2, height / 2);
      noLoop();
    }
  }

  pointsUp(ast_) {
    this.points += round(map(ast_, 30, 125, 5, 1));
  }

  showStats() {
    //show boost
    textSize(24);
    fill(255, 150);
    text("Boost: " + round(this.qBoost), 10, 35);
    push();
    if (this.qBoost > 30) {
      stroke(255);
    } else {
      stroke(255, 50);
    }
    strokeWeight(5);
    line(width, height, width, map(this.qBoost, 0, 180, height, 0));
    pop();

    //show life
    fill(255, 150);
    text("Life: " + round(this.life), 10, 60);

    push();
    stroke(0, 255, 0, 150);
    strokeWeight(5);
    line(0, height, map(this.life, 0, 300, 0, width), height);
    pop();

    //show points
    fill(255, 150);
    text("Points: " + this.points, 10, 85);
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
  constructor(rMin_, rMax_, pos_) {
    this.rMin = rMin_ || 60;
    this.rMax = rMax_ || 125;

    this.pos = pos_ || createVector(random(width), random(height));
    this.r = random(this.rMin, this.rMax);
    this.sides = floor(random(5, 12)) * 2;

    let speed_ = p5.Vector.random2D();
    this.speed = speed_.mult(random(1.5, 3));

    this.qAngle = random(-0.05, 0.15) * 0.1 * map(this.r, this.rMin / 3, this.rMax, 2.3, 1);
    this.angle = 0;

    this.offsets = [];
    for (var i = 0; i < this.sides; i++) {
      this.offsets[i] = random(4, 22);
    }
    this.path = this.createPath();

  }

  createPath() {
    let path_ = [];
    for (let i = 0; i < this.sides; i++) {
      let angle = TWO_PI * i / (this.sides)
      let xoff = map(cos(angle + phase), -1, 1, 0, 3);
      let yoff = map(sin(angle + phase), -1, 1, 0, 3);
      let r_ = map(noise(xoff, yoff, 0), 0, 1, (this.rMin - this.offsets[i] - 7), (this.rMax + 12) * 1.2);
      let x_ = r_ * cos(angle);
      let y_ = r_ * sin(angle);
      path_.push(createVector(x_, y_));
    }

    // OLD GENERATOR
    // for (let i = 1; i <= this.sides; i++) {
    //   let angle_ = TWO_PI * (i - 2) / this.sides;
    //   let x_ = this.r * cos(angle_) + this.offsets[i];
    //   let y_ = this.r * sin(angle_) + this.offsets[i];
    //   path_.push(createVector(x_, y_));
    // }

    phase = phase + 0.403;
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
    // line(0, 0, this.speed.x * 15, this.speed.y * 15); //show the direction
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

  absolutePos() {
    let asbP = [];
    for (let i = 0; i < this.path.length; i++) {
      asbP.push(this.path[i].copy().rotate(this.angle).add(this.pos));
    }
    return asbP;
  }

  collide(target_) {
    let hit = collidePolyPoly(this.absolutePos(), target_.absolutePos(), true);
    return hit;
  }

  inv(target_) {
    let force = p5.Vector.sub(target_.pos, this.pos);
    force.normalize();
    // this.speed = force.mult(-map(this.r, this.rMin, this.rMax, 3.2, 1.5));
    this.speed = force.mult(-map(this.r, this.rMin / 3, this.rMax, 4.5, 1.8));

  }

  isLasered(laser_) {
    let x_ = laser_.lenght * cos(laser_.angle);
    let y_ = laser_.lenght * sin(laser_.angle);
    let hit = collidePointPoly(laser_.pos.x + x_, laser_.pos.y + y_, this.absolutePos());
    return hit;
  }

  breakUp() {
    let ast_ = [];
    let pos_ = this.pos.copy();
    let pos2_ = this.pos.copy();
    let r_ = this.r;
    ast_[0] = new Asteroid(r_ / 3 + random(15, 30), r_ / 2 + random(15, 30), pos_);
    ast_[1] = new Asteroid(r_ / 3 + random(0, 30), r_ / 2 + random(0, 30), pos2_);

    return ast_;
  }

  getR() {
    return this.r;
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

class Laser {
  constructor(pos_, angle_) {
    this.pos = pos_;
    this.angle = angle_;
    this.lenght = 15;

    this.speed = p5.Vector.fromAngle(this.angle).mult(12);
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    stroke(255);
    strokeWeight(5);
    line(0, 0, this.lenght, 0);
    pop();
  }

  update() {
    this.pos.add(this.speed);
  }

  edges() {
    if (this.pos.x > width) { //right->left
      return true;
    } else if (this.pos.x < 0) { //left->right
      return true;
    }
    if (this.pos.y > height) { //bottom->top
      return true;
    } else if (this.pos.y < 0) { //top->bottom
      return true;
    }
    return false;
  }
}