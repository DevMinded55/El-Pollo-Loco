/**
 * @class DrawableObject
 * Base drawable: position, dimensions, image cache, and collision inset.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    offsetX = 0;
    offsetY = 0;
    offsetWidth = 0;
    offsetHeight = 0;

    /**
     * @returns {{ x: number, y: number, width: number, height: number }}
     */
    getCollisionBox() {
        const w = Math.max(1, this.width - this.offsetX - this.offsetWidth);
        const h = Math.max(1, this.height - this.offsetY - this.offsetHeight);
        return {
            x: this.x + this.offsetX,
            y: this.y + this.offsetY,
            width: w,
            height: h,
        };
    }

    /**
     * @param {string} path
     */
    loadImage(path) {
        let img = new Image();
        img.src = path;
        this.image = img;
        this.img = img;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Debug frame hook (optional); unused in production.
     * @param {CanvasRenderingContext2D} ctx
     */
    drawFrame(ctx) {
    }

    /**
     * Preloads image elements into {@link DrawableObject#imageCache}.
     * @param {string[]} arr asset paths
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
