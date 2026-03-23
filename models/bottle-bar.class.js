class Bottlebar extends DrawableObject {
    IMAGES = IMAGES.STATUS_BAR_BOTTLE;
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 90;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    increase() {
        this.percentage += 25;
        if (this.percentage > 100) {
            this.percentage = 100;
        }
        this.setPercentage(this.percentage);
    }

    decrease() {
        this.percentage -= 25;
        if (this.percentage < 0) {
            this.percentage = 0;
        }
        this.setPercentage(this.percentage);
    }

    isEmpty() {
        return this.percentage <= 0;
    }

    resolveImageIndex() {
        let index = Math.round(this.percentage / 20);
        return Math.max(0, Math.min(5, index));
    }
}
