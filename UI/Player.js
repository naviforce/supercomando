class Player {
    constructor(game) {
        this.game = game;
        this.width = 180; // 260
        this.height = 260; // 265
        this.x = 20;
        this.y = 300;
        this.speedY = 0;
        this.speedX = 0;
        this.maxSpeed = 15;
        this.projectiles = [];
        this.color = 'black';
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 0;
    }

   

    update (deltaTime) {
        if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed
        else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed
        else this.speedY = 0;
        if (this.game.keys.includes('ArrowLeft')) this.speedX = -this.maxSpeed
        else if (this.game.keys.includes('ArrowRight')) this.speedX = this.maxSpeed
        else this.speedX = 0;
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y > this.game.height - this.height * 1) this.y = this.game.
            height - this.height * 1;
        else if (this.y < -this.height * 0) this.y = -this.height * 0;
        if (this.x > this.game.width - this.width * 1) this.x = this.game.
            width - this.width * 1;
        else if (this.x < -this.width * 0.5) this.x = -this.width * 0.5;
        //handle projectiles
        this.projectiles.forEach(pr => { pr.update(); });
        this.projectiles = this.projectiles.filter(pr => !pr.markedForDeletion);
        //спрайтовая анимация
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }

    draw(context) {
        //context.fillStyle = this.color;
        //context.strokeRect(this.x, this.y, this.width, this.height);
        this.projectiles.forEach(pr => { pr.draw(context); });
        //отрисовка
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,
            this.x, this.y, this.width, this.height)
    }

    shootTop() {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + 160, this.y + 30));
            this.game.ammo--;
        }
    }
}

/*context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,
    this.x, this.y, this.width, this.height)*/