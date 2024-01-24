class Angler1 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 140;
        this.height = 200;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.image = document.getElementById('angler1');
        //this.frameY = Math.floor(Math.random() * 3);
        this.lives = 5;
        this.score = this.lives;
        this.color = 'red';
    }
}