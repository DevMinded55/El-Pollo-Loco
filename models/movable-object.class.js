/**
 * @class MovableObject
 * Adds gravity, collision, movement, and combat helpers over {@link DrawableObject}.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    landedAt = 0;

    /** Applies vertical acceleration via a timed interval. */
    applyGravity() {
        addGameInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                if (this.speedY < 0) {
                    this.landedAt = Date.now();
                }
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /** @returns {boolean} true while sprite is airborne (or always for bottles in flight). */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 155;
        }
    }

    /**
     * Axis-aligned overlap using {@link DrawableObject#getCollisionBox} on both sides.
     * @param {DrawableObject} mo
     */
    isColliding(mo) {
        const a = this.getCollisionBox();
        const b = mo.getCollisionBox();
        return (
            a.x + a.width > b.x &&
            a.x < b.x + b.width &&
            a.y + a.height > b.y &&
            a.y < b.y + b.height
        );
    }

    /** Reduces energy; sets {@link MovableObject#lastHit} timestamp when energy remains. */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /** @returns {boolean} true during brief invulnerability after hit */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.5;
    }

    /** @returns {boolean} */
    isDead() {
        return this.energy == 0;
    }

    /** Moves right by {@link speed}. */
    moveRight() {
        this.x += this.speed;
    }

    /** Moves left by {@link speed}. */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Advances cycling frame index into {@link DrawableObject#imageCache}.
     * @param {string[]} images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /** Starts upward velocity for a jump arc. */
    jump() {
        this.speedY = 30;
    }
}
