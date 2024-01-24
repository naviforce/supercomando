class Angler2 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 140;
        this.height = 200;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.image = document.getElementById('angler2');
        //this.frameY = Math.floor(Math.random() * 2);
        this.lives = 7;
        this.score = this.lives;
        this.color = 'green';
    }
}