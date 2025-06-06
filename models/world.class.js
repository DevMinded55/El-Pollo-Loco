class World {
    character = new Character();
    ctx;
    canvas;
    keyboard;
    level = new Level();
    camera_x = 0;
    statusBar = new Statusbar();
    coinBar = new Coinbar();
    bottleBar = new Bottlebar();
    bossBar = new Bossbar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
    addGameInterval(() => {
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkItemCollisions();
    }, 200);
}

    checkThrowObjects() {
        if (this.keyboard.D && !this.bottleBar.isEmpty()) {
            let bottle = new ThrowableObject(
                this.character.x + 50,
                this.character.y + 50
            );
            this.throwableObjects.push(bottle);
            this.bottleBar.decrease();
        }
    }

    checkCollisions() {
        // Gegner-Kollisionen
        this.level.enemies.forEach((enemy) => {
            if (
                this.character.isColliding(enemy) &&
                this.character.speedY < 0 &&
                !enemy.isDead
            ) {
                enemy.isDead = true;
                enemy.energy = 0;
                enemy.loadImage(enemy.IMAGE_DEAD);

                if (typeof enemy.stopAnimation === "function") {
                    enemy.stopAnimation();
                }

                setTimeout(() => {
                    const index = this.level.enemies.indexOf(enemy);
                    if (index > -1) {
                        this.level.enemies.splice(index, 1);
                    }
                }, 1000);

                this.character.jump();
            } else if (this.character.isColliding(enemy) && !enemy.isDead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);

                if (this.character.energy <= 0 && !this.character.dead) {
                    this.character.dead = true;
                    this.character.die();
                }
            }
        });

        // Flaschen-Kollisionen mit Boss
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (
                    enemy.isBoss &&
                    bottle.isColliding(enemy) &&
                    !bottle.broken &&
                    !enemy.dead
                ) {
                    enemy.hit();
                    bottle.broken = true;
                    this.bossBar.setPercentage(enemy.energy);

                    if (enemy.dead) {
                        setTimeout(() => {
                            showEndScreen(true);
                        }, 1000);
                    }
                }
            });
        });

        // Entferne zerbrochene Flaschen
        this.throwableObjects = this.throwableObjects.filter((b) => !b.broken);
    }

    checkItemCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.increase();
            }
        });

        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottleBar.increase();
            }
        });
    }

    draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.bossBar);

    animationFrameId = requestAnimationFrame(() => this.draw());
}

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}