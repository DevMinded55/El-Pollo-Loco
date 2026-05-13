/**
 * End boss: large hitbox, hurt by thrown bottles only (via {@link World#tryBottleHitBoss}).
 * Idle until the player gets close, then patrols and dashes at the character.
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    offsetX = 30;
    offsetY = 80;
    offsetWidth = 30;
    offsetHeight = 20;
    energy = 100;
    dead = false;
    hurt = false;
    isBoss = true;

    state = "idle";
    triggered = false;
    walkSpeed = 2;
    attackSpeed = 6;
    attackUntil = 0;
    attackCooldownUntil = 0;
    world;

    IMAGES_ALERT = IMAGES.ENDBOSS_ALERT;
    IMAGES_WALKING = IMAGES.ENDBOSS_WALK;
    IMAGES_ATTACK = IMAGES.ENDBOSS_ATTACK;
    IMAGES_HURT = IMAGES.ENDBOSS_HURT;
    IMAGES_DEAD = IMAGES.ENDBOSS_DEAD;

    /** Places the boss at the level end and starts animation + AI. */
    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2200;
        this.animate();
        this.runAi();
    }

    /** Wakes the boss; called from {@link World#checkEndbossApproach}. */
    trigger() {
        if (this.triggered) return;
        this.triggered = true;
        this.state = "walking";
    }

    /** Animation tick: chooses sprite strip from current state. */
    animate() {
        addGameInterval(() => {
            if (this.dead) {
                this.playAnimation(this.IMAGES_DEAD);
                return;
            }
            if (this.hurt) {
                this.playAnimation(this.IMAGES_HURT);
                return;
            }
            if (this.state === "attack") {
                this.playAnimation(this.IMAGES_ATTACK);
                return;
            }
            if (this.state === "walking") {
                this.playAnimation(this.IMAGES_WALKING);
                return;
            }
            this.playAnimation(this.IMAGES_ALERT);
        }, 1000 / 8);
    }

    /** Movement / AI tick at ~60 fps. */
    runAi() {
        addGameInterval(() => this.aiTick(), 1000 / 60);
    }

    /** One step of the behavior state machine. */
    aiTick() {
        if (this.dead || !this.triggered || !this.world) return;
        const target = this.world.character;
        const dx = target.x - this.x;
        this.otherDirection = dx > 0;

        if (this.state === "attack") {
            this.stepAttack(dx);
            return;
        }
        this.stepWalk(dx);
    }

    /** Walks toward player; transitions to attack when close enough. */
    stepWalk(dx) {
        const speed = this.hurt ? this.walkSpeed * 0.4 : this.walkSpeed;
        if (Math.abs(dx) > 5) {
            this.x += Math.sign(dx) * speed;
        }
        const now = Date.now();
        if (Math.abs(dx) < 260 && now > this.attackCooldownUntil && !this.hurt) {
            this.state = "attack";
            this.attackUntil = now + 700;
            this.currentImage = 0;
        }
    }

    /** Dashes toward player for the attack duration, then returns to walking. */
    stepAttack(dx) {
        if (Date.now() > this.attackUntil) {
            this.state = "walking";
            this.attackCooldownUntil = Date.now() + 1500;
            return;
        }
        if (Math.abs(dx) > 5) {
            this.x += Math.sign(dx) * this.attackSpeed;
        }
    }

    /** Bottle damage: 34 per hit so the boss dies after 3 bottles. */
    hit() {
        if (this.dead) return;
        this.energy = Math.max(0, this.energy - 34);
        this.hurt = true;
        setTimeout(() => {
            this.hurt = false;
        }, 500);
        if (this.energy === 0) this.die();
    }

    /** Marks dead and schedules win screen (see {@link showEndScreen}). */
    die() {
        this.dead = true;
        this.hurt = false;
        this.state = "dead";

        setTimeout(() => {
            showEndScreen(true);
        }, 1000);
    }

    /** @returns {boolean} */
    isDead() {
        return this.dead;
    }

    /** @returns {boolean} flash state after a hit */
    isHurt() {
        return this.hurt;
    }
}
