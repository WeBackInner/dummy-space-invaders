import { Player } from './player.js';
import { Alien } from './alien.js';
import { Bullet } from './bullet.js';

export class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 600;
    
    this.player = new Player(this.canvas.width / 2, this.canvas.height - 60);
    this.bullets = [];
    this.aliens = this.createAliens();
    this.score = 0;
    this.gameOver = false;
    
    this.bindEvents();
  }

  createAliens() {
    const aliens = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 11; col++) {
        aliens.push(new Alien(
          70 + col * 50,
          50 + row * 50,
          row
        ));
      }
    }
    return aliens;
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.player.moveLeft();
      if (e.key === 'ArrowRight') this.player.moveRight();
      if (e.key === ' ') this.shoot();
    });
  }

  shoot() {
    if (this.bullets.length < 3) {
      this.bullets.push(new Bullet(
        this.player.x + this.player.width / 2,
        this.player.y
      ));
    }
  }

  update() {
    this.player.update();
    
    // Update bullets
    this.bullets = this.bullets.filter(bullet => {
      bullet.update();
      return bullet.y > 0;
    });

    // Update aliens
    this.aliens.forEach(alien => alien.update());

    // Check collisions
    this.bullets.forEach((bullet, bulletIndex) => {
      this.aliens.forEach((alien, alienIndex) => {
        if (this.checkCollision(bullet, alien)) {
          this.bullets.splice(bulletIndex, 1);
          this.aliens.splice(alienIndex, 1);
          this.score += 10;
          document.getElementById('scoreValue').textContent = this.score;
        }
      });
    });

    // Check if aliens reached bottom
    if (this.aliens.some(alien => alien.y + alien.height >= this.canvas.height - 60)) {
      this.gameOver = true;
    }
  }

  checkCollision(bullet, alien) {
    return bullet.x < alien.x + alien.width &&
           bullet.x + bullet.width > alien.x &&
           bullet.y < alien.y + alien.height &&
           bullet.y + bullet.height > alien.y;
  }

  draw() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.draw(this.ctx);
    this.bullets.forEach(bullet => bullet.draw(this.ctx));
    this.aliens.forEach(alien => alien.draw(this.ctx));

    if (this.gameOver) {
      this.ctx.fillStyle = 'white';
      this.ctx.font = '48px Arial';
      this.ctx.fillText('GAME OVER', this.canvas.width/2 - 120, this.canvas.height/2);
    }
  }

  gameLoop() {
    if (!this.gameOver) {
      this.update();
      this.draw();
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  start() {
    this.gameLoop();
  }
}
