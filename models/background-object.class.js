/**
 * Parallax background tile.
 */
class BackgroundObject extends MovableObject{
    width = 720;
    height = 480;

    /**
     * @param {string} imagePath asset from {@link IMAGES}
     * @param {number} x world offset
     */
    constructor(imagePath, x){
        super();
        this.loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }

}
