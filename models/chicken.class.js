class Chicken extends MovableObject {
    height = 100;
    y = 330;
    width = 80;
    isDead = false;
    stompRatio = 0.8;
    walkingInterval;
    animationInterval;

    IMAGES_WALKING = IMAGES.CHICKEN_NORMAL_WALKING;
    IMAGE_DEAD = IMAGES.CHICKEN_NORMAL_DEAD;

    constructor(x) {
        super();
        this.loadImage(IMAGES.CHICKEN_NORMAL_WALKING[0]);
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
