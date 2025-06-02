class Chicken extends MovableObject{
    height = 100;
    y = 330;
    width = 80;
    IMAGES_WALKING = [
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    constructor(){
        super();
        this.loadImage("assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.speed = 0.15 + Math.random() * 0.5;
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() =>{
        this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 5);
        
    }
}