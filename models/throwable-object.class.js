/**
 * Thrown bottle projectile; collides with the end boss.
 */
class ThrowableObject extends MovableObject{

    broken = false;
    brokenAt = 0;
    direction = 1;

    /**
     * @param {number} x spawn X near character
     * @param {number} y spawn Y near character
     * @param {number} [direction=1] +1 right, -1 left
     */
    constructor(x, y, direction = 1) {
        super();
        this.loadAssets();
        this.applyHitbox(x, y);
        this.direction = direction;
        this.otherDirection = direction === -1;
        this.throw();
    }

    /** Preloads sprites used during flight and on impact. */
    loadAssets() {
        this.loadImage(IMAGES.ICON_SALSA_BOTTLE);
        this.loadImages(IMAGES.BOTTLE_ROTATION);
        this.loadImages(IMAGES.BOTTLE_SPLASH);
    }

    /**
     * Sets spawn position and collision insets.
     * @param {number} x
     * @param {number} y
     */
    applyHitbox(x, y) {
        this.x = x;
        this.y = y;
        this.height = 110;
        this.width = 100;
        this.offsetX = 20;
        this.offsetY = 15;
        this.offsetWidth = 20;
        this.offsetHeight = 15;
    }

    /** Arc gravity plus horizontal speed interval, plus rotation animation. */
    throw(){
        this.speedY = 30;
        this.applyGravity();
        addGameInterval(()=> {
            if (this.broken) return;
            this.x += 10 * this.direction;
            if (this.y >= 380) this.splash();
        }, 25);
        addGameInterval(() => {
            if (this.broken) {
                this.playAnimation(IMAGES.BOTTLE_SPLASH);
            } else {
                this.playAnimation(IMAGES.BOTTLE_ROTATION);
            }
        }, 80);
    }

    /** Triggers splash visuals + sound; pinned in place until pruned. */
    splash(){
        if (this.broken) return;
        this.broken = true;
        this.brokenAt = Date.now();
        this.speedY = 0;
        this.y = 380;
        this.currentImage = 0;
        playSound("BOTTLE_BREAK");
    }
}
