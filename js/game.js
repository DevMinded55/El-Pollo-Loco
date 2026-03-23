let canvas;
let world;
let keyboard = new Keyboard();
let animationFrameId;



function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

function startGame() {
    document.getElementById("start-screen").style.display = "none";
    canvas = document.getElementById("canvas");
    canvas.style.display = "block";
    init();
    playSound("GAME_START");
}

function showEndScreen(won) {
    const endScreen = document.getElementById("end-screen");
    const endImage = document.getElementById("end-image");
    const canvas = document.getElementById("canvas");

    canvas.style.display = "none";
    endScreen.hidden = false;
    endScreen.style.display = "flex";

    if (won) {
        endImage.src = "assets/img/You won, you lost/You win B.png";
    } else {
        endImage.src = "assets/img/You won, you lost/You lost b.png";
    }

    stopAllSounds();
    clearAllIntervals();
}

function restartGame() {
    const endScreen = document.getElementById("end-screen");
    endScreen.hidden = true;
    endScreen.style.display = "none";

    // Canvas wieder zeigen
    const canvas = document.getElementById("canvas");
    canvas.style.display = "block";

    //Alle Animationen werden gestoppt
    cancelAnimationFrame(animationFrameId);

    stopAllSounds();
    clearAllIntervals();

    // Welt neu initialisieren
    init();
}

window.addEventListener("keydown", (e) => {
    console.log(e);
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    console.log(e);
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});
