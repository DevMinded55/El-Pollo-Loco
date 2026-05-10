/**
 * Scrolling decorative cloud.
 */
class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    /** Random start X and continuous drift left. */
    constructor() {
        super();
        this.loadImage(IMAGES.CLOUD_1);

        this.x = Math.random() * 500;
        this.animate();
    }

    /** Slow left movement tick. */
    animate() {
        addGameInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
