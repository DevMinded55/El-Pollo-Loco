class Bottlebar extends DrawableObject {
    IMAGES = [
        "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
        "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
        "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
        "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
        "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
        "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png"
    ];
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
        this.percentage += 20;
        if (this.percentage > 100) {
            this.percentage = 100;
        }
        this.setPercentage(this.percentage);
    }

    decrease() {
        this.percentage -= 20;
        if (this.percentage < 0) {
            this.percentage = 0;
        }
        this.setPercentage(this.percentage);
    }

    isEmpty() {
        return this.percentage <= 0;
    }

    resolveImageIndex() {
    if (this.percentage >= 100) {
        return 5;
    } else if (this.percentage >= 80) {
        return 4;
    } else if (this.percentage >= 60) {
        return 3;
    } else if (this.percentage >= 40) {
        return 2;
    } else if (this.percentage >= 20) {
        return 1;
    } else {
        return 0;
    }
}
}
