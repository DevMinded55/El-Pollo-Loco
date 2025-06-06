class Bottles extends MovableObject{
    height = 100;
    y = 330;
    width = 100;
    IMAGES_WALKING = [
        "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];

    constructor(){
        super();
        this.loadImage("assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.speed = 0.15 + Math.random() * 0.5;
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        addGameInterval(() =>{
        this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 4);
    }
}