class Bottles extends MovableObject{
    height = 100;
    y = 330;
    width = 100;
    IMAGES_WALKING = IMAGES.BOTTLE_ON_GROUND;

    constructor(x){
        super();
        this.loadImage(IMAGES.BOTTLE_ON_GROUND[0]);
        this.speed = 0.15 + Math.random() * 0.5;
        this.x = x ?? 200 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        addGameInterval(() =>{
        this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 4);
    }
}