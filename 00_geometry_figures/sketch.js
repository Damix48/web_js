let radius = 150;
let a = 0;
let r;
let p;
let target;
let ball = [];
let index;
let number = 10;
let speed = 3;
let np = [];
// let vel;

function setup() {
  createCanvas(600, 600);
  // polygon(5);

}


function draw() {
  background(51);
  translate(width / 2, height / 2);
  rotate(-PI / 2);
  fill(255);

  rotate(PI);
  for (var i = 3; i < number; i++) {

    push();
    polygon(i);
    pop();

  }
  // for (var i = 0; i < p.length; i++) {
  //   // var element = array[i];

  // }
  // for (var i = 3; i < number; i++) {
  //   // if (frameCount == 1) {
  //   //   index = 0;
  //   //   ball.push(p[index]);
  //   // }

  //   let vel = p5.Vector.sub(p[index + 1], ball[0]);
  //   vel.setMag(2);
  //   ball[0].add(vel);

  //   ellipse(ball[0].x, ball[0].y, 10, 10);
  //   if (p5.Vector.dist(ball[0], p[(index + 1)]) < 1) {
  //     console.log("uguali");
  //     console.log(index);
  //     if (index < i - 3) {
  //       index++;
  //     } else {
  //       index = -1;
  //     }
  //   }

  // }
  if (frameCount == 1) {
    index = 0;
    for (let i = 0; i < np.length; i++) {
      ball.push(np[i][index]);
    }
    // ball.push(np[6][index]);
  }
  for (var i = 0; i < ball.length; i++) {
    push();
    rotate(PI / (i + 3));
    let vel = p5.Vector.sub(np[i][(index + 1) % (i + 3)], ball[i]);
    vel.setMag(speed);
    ball[i].add(vel);

    ellipse(ball[i].x, ball[i].y, 10, 10);
    if (p5.Vector.dist(ball[i], np[i][(index + 1) % (i + 3)]) < 0.001) {
      console.log("uguali");
      console.log(index);
      // if (index < i + number) {
      index++;
      // } else {
      //   index = -1;
      // }
    }


    pop();

  }

}

function polygon(n) {

  rotate(PI / n);
  r = (radius / sin(PI / n)) / 2;
  p = [];
  for (let i = 1; i <= n; i++) {
    // p[n] = [];
    let x_ = r * cos(TWO_PI * i / n);
    let y_ = r * sin(TWO_PI * i / n);
    p.push(createVector(x_, y_));
  }
  // console.log(p);

  strokeWeight(2);
  stroke(255);
  noFill();
  beginShape();
  for (let i = 0; i < p.length; i++) {
    // console.log(p[i].x);
    vertex(p[i].x, p[i].y);
  }
  endShape(CLOSE);

  np[n - 3] = p;
  // ball(p);



  // for (let i = 0; i < p.length; i++) {
  //   // console.log(p[i].x);
  //   let v = p5.Vector.sub(p[i], p[i + 1]);
  //   ellipse(p[i].x, p[i].y, 10, 10);
  // }
}