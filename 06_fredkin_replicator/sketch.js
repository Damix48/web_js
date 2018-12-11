let mappa;

function setup() {
  createCanvas(500, 500);
  mappa = new Mappa(50, 50);
  mappa.cells[23][22].active = true;
  mappa.cells[24][22].active = true;
  mappa.cells[22][23].active = true;
  mappa.cells[25][23].active = true;
  mappa.cells[23][24].active = true;
  mappa.cells[26][24].active = true;
  mappa.cells[22][25].active = true;
  mappa.cells[25][25].active = true;
  mappa.cells[23][26].active = true;
  mappa.cells[24][26].active = true;

  mappa.cellsNew[23][22].active = true;
  mappa.cellsNew[24][22].active = true;
  mappa.cellsNew[22][23].active = true;
  mappa.cellsNew[25][23].active = true;
  mappa.cellsNew[23][24].active = true;
  mappa.cellsNew[26][24].active = true;
  mappa.cellsNew[22][25].active = true;
  mappa.cellsNew[25][25].active = true;
  mappa.cellsNew[23][26].active = true;
  mappa.cellsNew[24][26].active = true;
}

function draw() {
  background(51);
  mappa.show();
  if (frameCount % 10 == 0) {
    mappa.update();
  }
}

class Mappa {
  constructor(col_, row_) {
    this.cols = col_;
    this.rows = row_;
    this.w = floor(width / this.cols);
    this.h = floor(height / this.rows);
    this.cells = this.initCells();
    this.cellsNew = this.initCells();
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

  countCells(i_, j_) {
    let temp = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (j_ + j != -1 && i_ + i != -1 && i_ + i != this.cells.length && j_ + j != this.cells[0].length) {
          if (this.cells[i_ + i][j_ + j].active && this.cells[i_ + i][j_ + j] != this.cells[i_][j_]) {
            temp++;
          }
        }
      }
    }
    return temp;
  }

  update() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.cellsNew[i][j].update(this.countCells(i, j));
      }
    }
    this.cells = [];
    this.cells = [...this.cellsNew];
    // for (let i = 0; i < this.cols; i++) {
    //   for (let j = 0; j < this.rows; j++) {
    //     this.cells[i][j].update();
    //   }
    // }
  }

  show() {
    for (let row of this.cells) {
      for (let cell of row) {
        cell.show();
        // cell.update(); pattern bello ma strano
      }
    }
  }
}

class Cell {
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;

    this.nearCells;

    this.active = false;
  }

  update(nearCells_) {
    this.nearCells = nearCells_;
    if (this.nearCells % 2 == 0) {
      this.active = false;
    } else {
      this.active = true;
    }
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