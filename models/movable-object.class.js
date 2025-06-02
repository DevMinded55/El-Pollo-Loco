class MovableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;

    loadImage(path){
        this.image = new Image();
        this.image.src = path;
    }

    moveRight() {
        console.log("Moving Right");
        
    }

    moveLeft(){

    }
}