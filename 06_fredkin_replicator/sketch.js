let mappa;

function setup() {
  createCanvas(800, 800);
  mappa = new Mappa(80, 80);
}

function draw() {
  background(51);
  mappa.show();
}

class Mappa {
  constructor(col_, row_) {
    this.cols = col_;
    this.rows = row_;
    this.w = floor(width / this.cols);
    this.h = floor(height / this.rows);
    this.cells = this.initCells();
  }

  initCells() {
    let temp = [];
    for (let i = 0; i < this.cols; i++) {
      temp[i] = [];
      for (let j = 0; j < this.rows; j++) {
        temp[i][j] = new Cell(j * this.w, i * this.h);
      }
    }
    return temp;
  }

  show() {
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.show();
      });
    });
  }
}

class Cell {
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;

    this.active = false;
  }

  show() {
    strokeWeight(1);
    stroke(255);
    if (this.active) {
      fill(255);
    } else {
      noFill();
    }
    rect(this.x, this.y, mappa.w, mappa.h);
  }
}