/**
 * Smaller ground enemy; same stomp rules as {@link Chicken}.
 */
class SmallChicken extends MovableObject {
    height = 60;
    y = 380;
    width = 50;
    offsetX = 4;
    offsetY = 4;
    offsetWidth = 4;
    offsetHeight = 4;
    isDead = false;
    stompRatio = 0.8;
    movementInterval;
    animationInterval;

    IMAGES_WALKING = IMAGES.CHICKEN_SMALL_WALKING;
    IMAGE_DEAD = IMAGES.CHICKEN_SMALL_DEAD;

    /**
     * @param {number} [x] world X; random default if omitted
     */
    constructor(x) {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
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
