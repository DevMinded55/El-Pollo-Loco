/**
 * Coin collection progress HUD.
 */
class Coinbar extends DrawableObject {
    IMAGES = IMAGES.STATUS_BAR_COIN;
    percentage = 100;

    /** Starts at empty coin bar. */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 45;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * @param {number} percentage filled segments 0–100
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /** Adds one pickup step (20%) capped at full. */
    increase() {
        this.percentage += 20;
        if (this.percentage > 100) {
            this.percentage = 100;
        }
        this.setPercentage(this.percentage);
    }

    /** @returns {number} strip index 0–5 */
    resolveImageIndex() {
        return Math.min(5, Math.floor(this.percentage / 20));
    }
}
