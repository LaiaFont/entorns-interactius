class Rodona {
  constructor(posXI, posYI, circleSizeI, colI, speedI, array) {
    this.col = colI;
    this.p = createVector(posXI, posYI);
    this.circleSize = circleSizeI;

    this.speedX = speedI;
    this.speedY = random(-2, 2);

    this.cir = array;
  }

  move() {
    this.p.x += this.speedX;
    this.p.y += random(this.speedY);
  }

  collide() {
    if (this.p.x + this.circleSize / 2 > width) {
      this.speedX *= -1;
      lines.push(
        new Line(
          this.p.x + this.circleSize / 2,
          this.p.y,
          this.col,
          this.circleSize
        )
      );
    } else if (this.p.x < this.circleSize / 2) {
      this.speedX *= -1;
      lines.push(
        new Line(
          this.p.x - this.circleSize / 2,
          this.p.y,
          this.col,
          this.circleSize
        )
      );
    } else if (this.p.y + this.circleSize / 2 > height) {
      this.speedY *= -1;
      lines.push(
        new Line(
          this.p.x,
          this.p.y + this.circleSize / 2,
          this.col,
          this.circleSize
        )
      );
    } else if (this.p.y < this.circleSize / 2) {
      this.speedY *= -1;
      lines.push(
        new Line(
          this.p.x,
          this.p.y - this.circleSize / 2,
          this.col,
          this.circleSize
        )
      );
    }
  }

  display() {
    noStroke();
    fill(this.col);
    circle(this.p.x, this.p.y, this.circleSize);
  }

  hide() {
    noFill();
  }

  getPos() {
    return this.p;
  }

  getRadius() {
    return this.circleSize / 2;
  }
}
