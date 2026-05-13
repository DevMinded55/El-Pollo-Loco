/**
 * Bottle / throw ammo HUD.
 *
 * Each pickup swaps to the next bar sprite in order
 * (0 → 20 → 40 → 60 → 80 → 100 %). With six sprites and six pickups,
 * the sixth bottle stays at the 100 % frame.
 */
class Bottlebar extends DrawableObject {
    /** Max throwable salsa charges (must match number of {@link Level#bottles} pickups). */
    static MAX_BOTTLES = 5;

    IMAGES = IMAGES.STATUS_BAR_BOTTLE;
    /** @type {number} 0…{@link Bottlebar.MAX_BOTTLES} */
    bottleCount = 0;
    /** @type {number} 0–100 derived from bottle count */
    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 90;
        this.width = 200;
        this.height = 60;
        this.setBottleCount(0);
    }

    /**
     * @param {number} count held bottles, clamped to 0…{@link Bottlebar.MAX_BOTTLES}
     */
    setBottleCount(count) {
        this.bottleCount = Math.max(
            0,
            Math.min(Bottlebar.MAX_BOTTLES, Math.round(count))
        );
        this.percentage =
            Bottlebar.MAX_BOTTLES === 0
                ? 0
                : (this.bottleCount / Bottlebar.MAX_BOTTLES) * 100;
        const path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * @param {number} percentage 0–100 (maps to nearest bottle count)
     */
    setPercentage(percentage) {
        const n = Math.round((percentage / 100) * Bottlebar.MAX_BOTTLES);
        this.setBottleCount(n);
    }

    /** +1 capped at {@link Bottlebar.MAX_BOTTLES}. */
    increase() {
        this.setBottleCount(this.bottleCount + 1);
    }

    /** −1 floored at 0. */
    decrease() {
        this.setBottleCount(this.bottleCount - 1);
    }

    /** @returns {boolean} no throws remaining */
    isEmpty() {
        return this.bottleCount <= 0;
    }

    /**
     * Direct one-to-one mapping: bottle count → sprite frame
     * (0, 20, 40, 60, 80, 100 %), clamped to the last frame.
     */
    resolveImageIndex() {
        return Math.min(this.IMAGES.length - 1, this.bottleCount);
    }
}
