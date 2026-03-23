const SOUNDS = {
    CHARACTER_JUMP: new Audio("audio/character/characterJump.wav"),
    CHARACTER_DAMAGE: new Audio("audio/character/characterDamage.mp3"),
    CHARACTER_DEAD: new Audio("audio/character/characterDead.wav"),
    CHARACTER_RUN: new Audio("audio/character/characterRun.mp3"),
    CHARACTER_SNORING: new Audio("audio/character/characterSnoring.mp3"),
    CHICKEN_DEAD: new Audio("audio/chicken/chickenDead.mp3"),
    CHICKEN_DEAD_2: new Audio("audio/chicken/chickenDead2.mp3"),
    COIN_COLLECT: new Audio("audio/collectibles/collectSound.wav"),
    BOTTLE_COLLECT: new Audio("audio/collectibles/bottleCollectSound.wav"),
    ENDBOSS_APPROACH: new Audio("audio/endboss/endbossApproach.wav"),
    GAME_START: new Audio("audio/game/gameStart.mp3"),
    BOTTLE_BREAK: new Audio("audio/throwable/bottleBreak.mp3"),
};

SOUNDS.CHARACTER_RUN.loop = true;
SOUNDS.CHARACTER_SNORING.loop = true;
SOUNDS.ENDBOSS_APPROACH.loop = true;

SOUNDS.CHARACTER_RUN.volume = 0.3;
SOUNDS.CHARACTER_SNORING.volume = 0.4;
SOUNDS.ENDBOSS_APPROACH.volume = 0.5;
SOUNDS.GAME_START.volume = 0.3;
SOUNDS.BOTTLE_BREAK.volume = 0.6;

function playSound(name) {
    const sound = SOUNDS[name];
    if (!sound) return;
    if (sound.loop) {
        if (!sound.paused) return;
        sound.currentTime = 0;
        sound.play();
    } else {
        sound.currentTime = 0;
        sound.play();
    }
}

function stopSound(name) {
    const sound = SOUNDS[name];
    if (!sound) return;
    sound.pause();
    sound.currentTime = 0;
}

function stopAllSounds() {
    Object.values(SOUNDS).forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
    });
}
