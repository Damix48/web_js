let a = 0;
let b = 0;


let slider;
let sValue;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(51);
  slider = createSlider(-12, 12, 2, 1);
  slider.position(10, 10);
  slider.style('width', '240px');

  sValue = slider.value();

  // slider.changed(ciao());

}

function draw() {
  console.log("ciao");
}

function draw() {
  if (sValue != slider.value()) {
    background(51);
    sValue = slider.value();
    a = 0;
    b = 0;
  }
  // background(51);
  noFill();
  stroke(255);
  strokeWeight(2);

  translate(width / 2, height / 2);
  // ellipseMode(CORNER);
  ellipse(0, 0, 500, 500);
  rotate(a);
  // ellipse(250 + (100 / 2), 0, 100, 100);
  strokeWeight(7);
  translate(250 + (100 / 2), 0);
  rotate(b);
  point(100 - 50, 0);

  // translate(width / 2, height / 2);
  // rotate(a);
  // // for (let a = 0; a < TWO_PI; a += 0.1) {
  // // point(250, 0);
  // translate(250, 0);
  // rotate(a);
  // point(125 / 2, 0);

  a += 0.01;
  b += sValue / 100;

  // }
}