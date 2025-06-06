class SmallChicken extends MovableObject {
    height = 60;
    y = 380;
    width = 50;
    isDead = false;
    movementInterval;
    animationInterval;

    IMAGES_WALKING = [
        "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ];
    IMAGE_DEAD = "assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png";

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.5;
        this.x = 200 + Math.random() * 500;
        this.animate();
    }

    animate() {
        addGameInterval(() => {
            if (!this.isDead) this.moveLeft();
        }, 1000 / 60);

        addGameInterval(() => {
            if (!this.isDead) this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 5);
    }

    stopAnimation() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }
}