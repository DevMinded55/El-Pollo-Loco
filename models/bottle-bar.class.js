/**
 * Bottle / throw ammo HUD.
 */
class Bottlebar extends DrawableObject {
    IMAGES = IMAGES.STATUS_BAR_BOTTLE;
    percentage = 100;

    /** Starts with no bottles. */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 90;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * @param {number} percentage salsa ammo 0–100
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /** +25% capped at 100. */
    increase() {
        this.percentage += 25;
        if (this.percentage > 100) {
            this.percentage = 100;
        }
        this.setPercentage(this.percentage);
    }

    /** −25% floored at 0. */
    decrease() {
        this.percentage -= 25;
        if (this.percentage < 0) {
            this.percentage = 0;
        }
        this.setPercentage(this.percentage);
    }

    /** @returns {boolean} no throws remaining */
    isEmpty() {
        return this.percentage <= 0;
    }

    /** @returns {number} index 0–5 using rounded fifths */
    resolveImageIndex() {
        let index = Math.round(this.percentage / 20);
        return Math.max(0, Math.min(5, index));
    }
}
