class Line {
  constructor(x, y, col, size) {
    this.posX = x;
    this.posY = y;
    this.col = col;
    this.endPosX = x;
    this.endPosY = y;
    this.size = size;
  }

  display() {
    stroke(this.col);
    strokeWeight(3);
    line(this.posX, this.posY, this.endPosX, this.endPosY);
  }

  hide() {
    noStroke();
  }

  growLine() {
    if (this.posX < 0) {
      this.endPosX += map(
        this.size,
        0,
        this.size,
        0,
        frameCount * random(0.2, 1)
      );
      this.endPosY = this.posY;
    } else if (this.posX > width) {
      this.endPosX -= map(
        this.size,
        0,
        this.size,
        0,
        frameCount * random(0.2, 1)
      );
      this.endPosY = this.posY;
    } else if (this.posY < 0) {
      this.endPosY += map(
        this.size,
        0,
        this.size,
        0,
        frameCount * random(0.2, 1)
      );
      this.endPosX = this.posX;
    } else if (this.posY > height) {
      this.endPosY -= map(
        this.size,
        0,
        this.size,
        0,
        frameCount * random(0.2, 1)
      );
      this.endPosX = this.posX;
    }
  }
}
