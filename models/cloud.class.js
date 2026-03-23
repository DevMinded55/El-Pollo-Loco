class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    

    constructor() {
        super();
        this.loadImage(IMAGES.CLOUD_1);

        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
    addGameInterval(() => {
        this.moveLeft();
    }, 1000 / 60);
}
}
