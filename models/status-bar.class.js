/**
 * Player health bar HUD sprite strip.
 */
class Statusbar extends DrawableObject {
    IMAGES = IMAGES.STATUS_BAR_HEALTH;
    percentage = 100;

    /** Picks full-health frame at layout position. */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Selects sprite index from discrete 20% steps.
     * @param {number} percentage character energy 0–100
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /** @returns {number} index 0–5 into {@link Statusbar#IMAGES} */
    resolveImageIndex() {
        return Math.min(5, Math.floor(this.percentage / 20));
    }
}
