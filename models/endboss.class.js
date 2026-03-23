class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 100;
    dead = false;
    hurt = false;
    isBoss = true;

    IMAGES_WALKING = IMAGES.ENDBOSS_ALERT;
    IMAGES_HURT = IMAGES.ENDBOSS_HURT;
    IMAGES_DEAD = IMAGES.ENDBOSS_DEAD;

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

    hit() {
        if (this.dead) return;
        this.energy -= 25;
        if (this.energy < 0) this.energy = 0;

        this.hurt = true;

        setTimeout(() => {
            this.hurt = false;
        }, 500);

        if (this.energy === 0) {
            this.die();
        }

        console.log("Endboss wurde getroffen!");
    }

    die() {
        this.dead = true;
        this.hurt = false;

        setTimeout(() => {
            showEndScreen(true); // Spieler gewinnt
        }, 1000);
    }

    isDead() {
        return this.dead;
    }

    isHurt() {
        return this.hurt;
    }
}
