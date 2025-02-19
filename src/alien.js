export class Alien {
  constructor(x, y, row) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.row = row;
    this.direction = 1;
    this.speed = 1;
  }

  update() {
    this.x += this.speed * this.direction;
    
    if (this.x <= 0 || this.x >= 800 - this.width) {
      this.direction *= -1;
      this.y += 20;
    }
  }

  draw(ctx) {
    ctx.fillStyle = `rgb(${255 - this.row * 30}, 255, ${255 - this.row * 30})`;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
