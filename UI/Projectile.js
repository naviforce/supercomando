// патрики
class Projectile {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 3;
        this.speed = 20;
        this.markedForDeletion = false;
        this.color = 'yellow';
        this.image = document.getElementById('projectile');
    }
  
    update() {
        this.x += this.speed;
        if (this.x > this.game.width * 0.9) this.markedForDeletion = true;
    }
  
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y);
    }
}

// отображение патриков
class UI {
    constructor(game) {
        this.game = game;
        this.color = 'red';
    }

    draw(context) {
    context.save();
    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'black';
    context.font = '30px Bangers';
    context.font = this.fontSize + 'px ' + this.fontFamily;
    // очки
    context.fillText('AMMO:', 20, 40);
    context.fillText('Score: ' + this.game.score, 20, 100);
    //таймер
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    context.fillText('Timer: ' + formattedTime, 150, 100);
    // сообщения о победе или проигрыше
    if (this.game.gameOver) {
        context.textAlign = 'center';
        let message1;
        let message2;
        if (this.game.isWin()) {
            message1 = 'DOOMSLAYER!';
            message2 = 'Победа!';
        } else {
            message1 = 'Zombies WIN!';
            message2 = 'Всех сожрали!';
        }
        context.font = '70px ' + this.fontFamily;
        context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
        context.font = '25px ' + this.fontFamily;
        context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
    }
    for (let i = 0; i < this.game.ammo; i++) {
        context.fillRect(i + 20, 50, 3, 20);
  }
  context.restore();
}
}
//БЛУДНИЩА
class Particle {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.image = document.getElementById('blood');
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteSize = 250;
        this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
        this.size = this.spriteSize * this.sizeModifier;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * -15;
        this.gravity = 0.5; // коэффициент увеличения скорости (ускорение)
        this.markedForDeletion = false;
        this.angle = 0; // начальный угол поворота частицы
        this.va = Math.random() * 0.2 - 0.1; // скорость поворота частицы
        this.bounced = 0; // количество ударов (отскоков) частицы от поверхности "земли"
        this.bottomBounceBoundary = Math.random() * 80 + 60; // границы касания частиц с поверхностью земли
    }
    update() {
        this.angle += this.va;
        this.speedY += this.gravity;
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
            if (this.y > this.game.height + this.size || this.x < 0 - this.size) this.markedForDeletion = true;
            if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 2) {
                this.bounced++;
                this.speedY *= -0.5;
            }
    }
    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY
            * this.spriteSize, this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
        context.restore();
        }
}
