class Coins extends MovableObject{
    height = 140;
    y;
    width = 140;
    IMAGES_WALKING = [
        "assets/img/8_coin/coin_1.png",
        "assets/img/8_coin/coin_2.png"
    ];

    constructor(){
        super();
        this.loadImage("assets/img/8_coin/coin_1.png");
        this.speed = 0.15 + Math.random() * 0.5;
        this.x = 200 + Math.random() * 500;
        this.y = 100 + Math.random() * 150;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() =>{
        this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 4);
        addGameInterval(this.myInterval);
    }
}