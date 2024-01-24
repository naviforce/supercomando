class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.keys = [];   
        this.ammo = 500;
        this.ui = new UI(this);
        this.ammoTimer = 0;
        this.maxAmmo = 800;
        this.ammoInterval = 350;
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.gameOver = false;
        this.score = 0;
        this.winningScore = 50;
        this.gameTime = 0;
        this.timeLimit = 60 * 1000;
        this.background = new Background(this);
        this.speed = 1;
        this.debug = true;
        this.particles = [];
    }
    //коллизии квадратов
    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect2.x < rect1.x + rect1.width &&
            rect1.y < rect2.y + rect2.height &&
            rect2.y < rect1.y + rect1.height)
    }

    isWin() {
        return this.score >= this.winningScore;
    }

    update(deltaTime) {
        this.background.update();
        this.background.layer3.update();
        this.background.layer2.update();
        if (!this.gameOver) this.gameTime += deltaTime;
        if (this.gameTime > this.timeLimit) this.gameOver = true;
        //прибавление патриков
        this.player.update(deltaTime);
        if (this.ammoTimer > this.ammoInterval) {
            if (this.ammo < this.maxAmmo) this.ammo++;
            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime;
        }
        //
        this.particles.forEach(particle => particle.update());
        this.particles = this.particles.filter(particle => !particle.markedForDeletion);
        //прибавление врагов
        this.enemies.forEach(enemy => enemy.update());

        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);

        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
        //условие для коллизий
        this.enemies.forEach(enemy => {
            enemy.update();
            // Проверим, не столкнолся ли враг с главным игроком (player)
            if (this.checkCollision(this.player, enemy)) {
                // если столкновение произошло, помечаем врага как удаленного
                enemy.markedForDeletion = true;
                for (let i = 0; i < enemy.score; i++) {
                    this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5,
                        enemy.y + enemy.height * 0.5));
                };
            }    
            // для всех активных пуль (projectiles) также проверим условие столкновения
            // пули с врагом. 
            this.player.projectiles.forEach(projectile => {
                if (this.checkCollision(projectile, enemy)) {
                    // если столкновение произошло, помечаем снаряд как удаленный
                    projectile.markedForDeletion = true;
                }    
            // -------Если пуля попала в врага -----------
                if (this.checkCollision(projectile, enemy)) {
                    enemy.lives--; // уменьшаем жизни врага на единицу
                    this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                    projectile.markedForDeletion = true; // удаляем пулю
                    // Проверяем, если у врага не осталось жизней
                    if (enemy.lives <= 0) {        
                        enemy.markedForDeletion = true; // удаляем врага        
                        this.score += enemy.score; // увеличиваем количество очков главного игрока 
                        if (!this.gameOver) this.score += enemy.score;      
                        if (this.isWin()) this.gameOver = true;  // проверяем условие победы
                    }
                }
            })
        });
        /*this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }*/
    }

    draw(context) {
        this.background.draw(context);
        this.player.draw(context);
        this.particles.forEach(particle => particle.draw(context));
        this.enemies.forEach(enemy => enemy.draw(context));
        this.ui.draw(context);
        this.background.layer2.draw(context);
        this.background.layer3.draw(context);
    }
    

    addEnemy() {
        const randomize = Math.random();
        if (randomize < 0.5) this.enemies.push(new Angler1(this));
        else this.enemies.push(new Angler2(this));
    }
    addParticles(number, enemy) {
        for (let i = 0; i < number; i++) {
            this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
        };
    }
}