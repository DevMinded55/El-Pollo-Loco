let canvas;
let world;

function init(){
    canvas = document.getElementById("canvas")
    world = new World(canvas);
    
    console.log("my Char is", world.character);
    console.log("my enemies are", world.enemies);
}