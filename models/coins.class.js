/**
 * Collectible coin in the air.
 */
class Coins extends MovableObject{
    height = 140;
    y;
    width = 140;
    offsetX = 45;
    offsetY = 45;
    offsetWidth = 45;
    offsetHeight = 45;
    IMAGES_WALKING = IMAGES.COIN;

    /**
     * @param {number} [x] world X; random default if omitted
     */
    constructor(x){
        super();
        this.loadImage(IMAGES.COIN[0]);
        this.speed = 0.15 + Math.random() * 0.5;
        this.x = x ?? 200 + Math.random() * 500;
        this.y = 100 + Math.random() * 150;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    /** Spinning coin sprite interval. */
    animate() {
        addGameInterval(() =>{
        this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 4);
    }
}
