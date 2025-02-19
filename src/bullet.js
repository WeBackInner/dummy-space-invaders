export class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 15;
    this.speed = 7;
  }

  update() {
    this.y -= this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
