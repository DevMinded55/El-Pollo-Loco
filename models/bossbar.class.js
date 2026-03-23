class Bossbar extends DrawableObject {
    IMAGES = IMAGES.STATUS_BAR_BOSS;

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let index = Math.floor(percentage / 20);
        if (index < 0) index = 0;
        if (index > 5) index = 5;
        this.img = this.imageCache[this.IMAGES[index]];
    }
}
