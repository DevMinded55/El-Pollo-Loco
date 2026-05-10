/**
 * Ground enemy; stomp to defeat.
 */
class Chicken extends MovableObject {
    height = 100;
    y = 330;
    width = 80;
    offsetX = 5;
    offsetY = 5;
    offsetWidth = 5;
    offsetHeight = 10;
    isDead = false;
    stompRatio = 0.8;
    walkingInterval;
    animationInterval;

    IMAGES_WALKING = IMAGES.CHICKEN_NORMAL_WALKING;
    IMAGE_DEAD = IMAGES.CHICKEN_NORMAL_DEAD;

    /**
     * @param {number} [x] world X; random default if omitted
     */
    constructor(x) {
        super();
        this.loadImage(IMAGES.CHICKEN_NORMAL_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.5;
        this.x = x ?? 200 + Math.random() * 500;
        this.animate();
    }

    /** Walk left and walk animation intervals while alive. */
    animate() {
        addGameInterval(() => {
            if (!this.isDead) this.moveLeft();
        }, 1000 / 60);

        addGameInterval(() => {
            if (!this.isDead) this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 5);
    }

    /** Legacy hook; intervals today use {@link addGameInterval} IDs instead. */
    stopAnimation() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }
}
