class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    

    constructor() {
        super();
        this.loadImage("assets/img/5_background/layers/4_clouds/1.png");

        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
    addGameInterval(() => {
        this.moveLeft();
    }, 1000 / 60);
}
}
