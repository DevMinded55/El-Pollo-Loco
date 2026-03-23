class Coins extends MovableObject{
    height = 140;
    y;
    width = 140;
    IMAGES_WALKING = IMAGES.COIN;

    constructor(x){
        super();
        this.loadImage(IMAGES.COIN[0]);
        this.speed = 0.15 + Math.random() * 0.5;
        this.x = x ?? 200 + Math.random() * 500;
        this.y = 100 + Math.random() * 150;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        addGameInterval(() =>{
        this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 4);
    }
}