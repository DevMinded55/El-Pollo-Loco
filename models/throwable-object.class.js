/**
 * Thrown bottle projectile; collides with the end boss.
 */
class ThrowableObject extends MovableObject{

    /**
     * @param {number} x spawn X near character
     * @param {number} y spawn Y near character
     */
    constructor(x, y){
        super();
        this.loadImage(IMAGES.ICON_SALSA_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 110;
        this.width = 100;
        this.offsetX = 20;
        this.offsetY = 15;
        this.offsetWidth = 20;
        this.offsetHeight = 15;
        this.throw();
    }

    /** Arc gravity plus horizontal speed interval. */
    throw(){
        this.speedY = 30;
        this.applyGravity();
        addGameInterval(()=> {
            this.x += 10;
        }, 25);
    }
}
