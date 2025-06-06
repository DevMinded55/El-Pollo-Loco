class Bossbar extends DrawableObject {
    IMAGES = [
        "assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
        "assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
    ];

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
