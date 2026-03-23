class ThrowableObject extends MovableObject{



    constructor(x, y){
        super();
        this.loadImage(IMAGES.ICON_SALSA_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 110;
        this.width = 100;
        this.throw();
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();
        addGameInterval(()=> {
            this.x += 10;
        }, 25);
    }
}