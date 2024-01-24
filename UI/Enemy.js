class Enemy {
    constructor(game) {
        this.game = game;
        this.x = this.game.width;
        this.speedX = Math.random() * -0.5 - 1.5;
        this.markedForDeletion = false;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 0;
    }
    update() {
        this.x += this.speedX;
        if (this.x + this.width < 0) this.markedForDeletion = true;
        this.x += this.speedX - this.game.speed; // вычитаем this.game.speed чтобы enemies появлялись равномерно, а не все разом
        if (this.x + this.width < 0) this.markedForDeletion = true;
        // sprite animation
        /*if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else this.frameX = 0;*/
    }
    draw(context) {
        //if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        //context.fillStyle = this.color;
        //context.strokeRect(this.x, this.y, this.width, this.height);
        context.fillStyle = 'black';
        context.font = '25px Roboto';
        //context.fillText(this.lives, this.x, this.y - 5)
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,
            this.x, this.y, this.width, this.height);
        //context.fillStyle = 'yellow';
        //if (this.game.debug) {
          //  context.font = '20px Helvetica'
            //context.fillText(this.lives, this.x + 18, this.y + 23);
        //}
    }
}