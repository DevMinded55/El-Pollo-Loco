class SmallChicken extends MovableObject {
    height = 60;
    y = 380;
    width = 50;
    isDead = false;
    stompRatio = 0.8;
    movementInterval;
    animationInterval;

    IMAGES_WALKING = IMAGES.CHICKEN_SMALL_WALKING;
    IMAGE_DEAD = IMAGES.CHICKEN_SMALL_DEAD;

    constructor(x) {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.5;
        this.x = x ?? 200 + Math.random() * 500;
        this.animate();
    }

    animate() {
        addGameInterval(() => {
            if (!this.isDead) this.moveLeft();
        }, 1000 / 60);

        addGameInterval(() => {
            if (!this.isDead) this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 5);
    }

    stopAnimation() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }
}