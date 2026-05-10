/**
 * End boss: large hitbox, hurt by thrown bottles only (via {@link World#tryBottleHitBoss}).
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

    IMAGES_WALKING = IMAGES.ENDBOSS_ALERT;
    IMAGES_HURT = IMAGES.ENDBOSS_HURT;
    IMAGES_DEAD = IMAGES.ENDBOSS_DEAD;

    /** Places the boss at the level end and starts animation. */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2200;
        this.energy = 100;
        this.dead = false;
        this.hurt = false;
        this.animate();
    }

    /** Cycles alert / hurt / dead sprites from {@link Endboss#dead} and {@link Endboss#hurt}. */
    animate() {
        addGameInterval(() => {
            if (this.dead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.hurt) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 5);
    }

    /** Bottle damage: lowers energy, brief hurt flag, may {@link Endboss#die}. */
    hit() {
        if (this.dead) return;
        this.energy = Math.max(0, this.energy - 25);
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

        setTimeout(() => {
            showEndScreen(true); // Spieler gewinnt
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
