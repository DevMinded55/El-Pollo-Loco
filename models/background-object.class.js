class BackgroundObject extends MovableObject{
    width = 720;
    height = 480;

    constructor(imagePath, x){
        super();
        this.loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }

}