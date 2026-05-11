/**
 * @class World
 * Renders the level, runs collision checks, and ties character to keyboard input.
 */
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

    lastThrowTime = 0;
    endbossTriggered = false;

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Keyboard} keyboard
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.draw();
        this.setWorld();
        this.run();
    }

    /** Assigns this world on the {@link Character} and the {@link Endboss}. */
    setWorld() {
        this.character.world = this;
        const boss = this.level.enemies.find((e) => e.isBoss);
        if (boss) boss.world = this;
    }

    /** Starts fixed-interval game logic (collisions, throws, items, boss cue). */
    run() {
        addGameInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkItemCollisions();
            this.checkEndbossApproach();
        }, 10);
    }

    /** Wakes the boss + plays approach sound once when the player nears him. */
    checkEndbossApproach() {
        if (this.endbossTriggered) return;
        const boss = this.level.enemies.find((e) => e.isBoss);
        if (boss && Math.abs(this.character.x - boss.x) < 500) {
            this.endbossTriggered = true;
            if (typeof boss.trigger === "function") boss.trigger();
            playSound("ENDBOSS_APPROACH");
        }
    }

    /** Spawns a {@link ThrowableObject} when D is pressed and bottles remain. */
    checkThrowObjects() {
        const now = Date.now();
        if (this.keyboard.D && !this.bottleBar.isEmpty() && now - this.lastThrowTime > 300) {
            this.lastThrowTime = now;
            const dir = this.character.otherDirection ? -1 : 1;
            const spawnX = this.character.x + (dir === 1 ? 50 : -50);
            let bottle = new ThrowableObject(
                spawnX,
                this.character.y + 50,
                dir
            );
            this.throwableObjects.push(bottle);
            this.bottleBar.decrease();
        }
    }

    /** Runs enemy, bottle-vs-boss, and cleanup passes. */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkBottleBossCollisions();
        this.pruneBrokenBottles();
    }

    /** Resolves character vs each living enemy. */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => this.processEnemyCollision(enemy));
    }

    /**
     * Stomp, contact damage, or ignore for defeated foes.
     * @param {MovableObject} enemy
     */
    processEnemyCollision(enemy) {
        if (this.isEnemyDefeated(enemy)) return;
        if (!this.character.isColliding(enemy)) return;
        if (this.tryStompEnemy(enemy)) return;
        this.damageCharacterIfVulnerable();
    }

    /**
     * @param {MovableObject} enemy
     * @returns {boolean} true if stomp was applied
     */
    tryStompEnemy(enemy) {
        if (!this.isStompHit(enemy)) return false;
        this.defeatEnemyByStomp(enemy);
        this.character.jump();
        return true;
    }

    /** Applies hurt + death if the character is not in invulnerability frames. */
    damageCharacterIfVulnerable() {
        if (this.character.isHurt()) return;
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        playSound("CHARACTER_DAMAGE");

        if (this.character.energy <= 0 && !this.character.dead) {
            this.character.dead = true;
            this.character.die();
        }
    }

    /** Tests every thrown bottle against every enemy (boss hits only matter). */
    checkBottleBossCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                this.tryBottleHitBoss(bottle, enemy);
            });
        });
    }

    /**
     * @param {ThrowableObject} bottle
     * @param {MovableObject} enemy
     */
    tryBottleHitBoss(bottle, enemy) {
        if (!enemy.isBoss || bottle.broken || enemy.dead) return;
        if (!bottle.isColliding(enemy)) return;
        enemy.hit();
        bottle.splash();
        this.bossBar.setPercentage(enemy.energy);
    }

    /** Drops shattered bottle instances after the splash animation has played. */
    pruneBrokenBottles() {
        this.throwableObjects = this.throwableObjects.filter(
            (b) => !b.broken || Date.now() - b.brokenAt < 400
        );
    }

    /** @param {MovableObject} enemy */
    isEnemyDefeated(enemy) {
        if (typeof enemy.isDead === "function") {
            return enemy.isDead();
        }
        return !!enemy.isDead || !!enemy.dead;
    }

    /** True when the character is falling onto the top zone of a non-boss enemy. */
    isStompHit(enemy) {
        if (enemy.isBoss) return false;
        if (this.character.speedY >= 0) return false;

        const charBox = this.character.getCollisionBox();
        const enemyBox = enemy.getCollisionBox();
        const characterBottom = charBox.y + charBox.height;
        const stompZone = enemyBox.y + enemyBox.height * enemy.stompRatio;

        return characterBottom <= stompZone;
    }

    /** Kills a normal enemy after stomp; schedules removal from {@link Level#enemies}. */
    defeatEnemyByStomp(enemy) {
        enemy.isDead = true;
        enemy.energy = 0;
        enemy.loadImage(enemy.IMAGE_DEAD);
        playSound(enemy instanceof SmallChicken ? "CHICKEN_DEAD_2" : "CHICKEN_DEAD");

        if (typeof enemy.stopAnimation === "function") {
            enemy.stopAnimation();
        }

        this.scheduleEnemyRemoval(enemy);
    }

    /** Removes enemy from the level array after the death animation delay. */
    scheduleEnemyRemoval(enemy) {
        setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 1000);
    }

    /** Coin and ground-bottle pickups. */
    checkItemCollisions() {
        this.collectCoins();
        this.collectGroundBottles();
    }

    /** Splices collected coins and updates {@link Coinbar}. */
    collectCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.increase();
                playSound("COIN_COLLECT");
            }
        });
    }

    /** Splices collected bottles and updates {@link Bottlebar}. */
    collectGroundBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottleBar.increase();
                playSound("BOTTLE_COLLECT");
            }
        });
    }

    /** Full frame: world + HUD + schedules next rAF. */
    draw() {
        this.clearCanvas();
        this.drawWorldLayer();
        this.drawHudLayer();
        animationFrameId = requestAnimationFrame(() => this.draw());
    }

    /** Clears the canvas buffer. */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /** Renders parallax, entities, projectiles, clouds with camera translate. */
    drawWorldLayer() {
        this.ctx.translate(this.camera_x, 0);
        this.addWorldObjects();
        this.ctx.translate(-this.camera_x, 0);
    }

    /** Queues drawable world objects in paint order. */
    addWorldObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /** Status bars fixed to screen space (no camera offset). */
    drawHudLayer() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.bossBar);
    }

    /** @param {DrawableObject[]} objects */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Draws one drawable; mirrors horizontally when {@link MovableObject#otherDirection}.
     * @param {DrawableObject} mo
     */
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

    /** Begins horizontal mirror transform around {@link DrawableObject#width}. */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /** Restores transform after mirroring. */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
