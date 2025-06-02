class Chicken extends MovableObject{
    height = 100;
    y = 330;
    width = 80;

    constructor(){
        super();
        this.loadImage("assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

        this.x = 200 + Math.random() * 500;
    }
}