/**
 * @file Bootstraps the canvas game: keyboard/touch input, screens, and audio UI.
 */
let canvas;
let world;
let keyboard = new Keyboard();
let animationFrameId;

const KEY_MAP = { 37: "LEFT", 39: "RIGHT", 38: "UP", 40: "DOWN", 32: "SPACE", 68: "D" };

/**
 * Maps keydown/keyup to {@link Keyboard} flags.
 * @param {KeyboardEvent} e
 * @param {boolean} down
 */
function setKeyFromEvent(e, down) {
    const prop = KEY_MAP[e.keyCode];
    if (prop) keyboard[prop] = down;
}

/** Syncs the start-screen mute button DOM with {@link getMuted}. */
function syncMuteButton() {
    const muteBtn = document.getElementById("mute-btn");
    if (!muteBtn) return;
    muteBtn.classList.toggle("is-muted", getMuted());
    muteBtn.setAttribute("aria-pressed", String(getMuted()));
}

/** Wires the Impressum button to open the modal dialog. */
function bindImprintOpen() {
    const open = document.getElementById("imprint-open");
    const dlg = document.getElementById("imprint-dialog");
    if (open && dlg) {
        open.addEventListener("click", () => dlg.showModal());
    }
}

/** Mute toggle + imprint: called once on DOMContentLoaded. */
function initStartScreenControls() {
    const muteBtn = document.getElementById("mute-btn");
    if (muteBtn) {
        muteBtn.addEventListener("click", () => {
            toggleMuted();
            syncMuteButton();
        });
    }
    syncMuteButton();
    bindImprintOpen();
}

/**
 * @param {HTMLButtonElement} btn
 * @param {(ev: TouchEvent) => void} release
 */
function wireTouchRelease(btn, release) {
    btn.addEventListener("touchend", release, { passive: false });
    btn.addEventListener("touchcancel", release, { passive: false });
}

/** Binds one touch control to a {@link Keyboard} key via data-key. */
function bindTouchBtn(btn) {
    const key = btn.dataset.key;
    const release = (ev) => {
        ev.preventDefault();
        keyboard[key] = false;
    };
    const press = (ev) => {
        ev.preventDefault();
        keyboard[key] = true;
    };
    btn.addEventListener("touchstart", press, { passive: false });
    wireTouchRelease(btn, release);
}

/** Registers all `.touch-btn` elements. */
function bindTouchControls() {
    document.querySelectorAll(".touch-btn").forEach(bindTouchBtn);
}

/** Best-effort landscape lock after user gesture (browser-dependent). */
function tryLockLandscape() {
    const o = screen.orientation;
    if (!o || typeof o.lock !== "function") return;
    o.lock("landscape").catch(() => {});
}

/** Shows canvas wrapper and touch overlay during play. */
function showPlayingStage() {
    const stage = document.getElementById("game-stage");
    const touch = document.getElementById("touch-controls");
    stage.classList.add("is-playing");
    touch.removeAttribute("hidden");
}

/** Hides game stage and touch controls (e.g. end screen). */
function hidePlayingStage() {
    const stage = document.getElementById("game-stage");
    const touch = document.getElementById("touch-controls");
    stage.classList.remove("is-playing");
    touch.setAttribute("hidden", "");
}

/** Creates or recreates {@link World} on {@link canvas}. */
function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

/** Hides start UI, shows stage, starts world + game-start sound. */
function startGame() {
    document.getElementById("start-screen").style.display = "none";
    canvas = document.getElementById("canvas");
    showPlayingStage();
    tryLockLandscape();
    init();
    playSound("GAME_START");
}

/**
 * Sets win/lose image on the end-screen overlay.
 * @param {boolean} won
 */
function setEndScreenImage(won) {
    const endImage = document.getElementById("end-image");
    endImage.src = won ? IMAGES.END_WIN : IMAGES.END_LOSE;
}

/**
 * Stops the game loop, shows end UI, clears audio and intervals.
 * @param {boolean} won
 */
function showEndScreen(won) {
    cancelAnimationFrame(animationFrameId);
    hidePlayingStage();
    const endScreen = document.getElementById("end-screen");
    endScreen.hidden = false;
    endScreen.style.display = "flex";
    setEndScreenImage(won);
    stopAllSounds();
    clearAllIntervals();
}

/** Closes end overlay and rebuilds the world for another run. */
function restartGame() {
    const endScreen = document.getElementById("end-screen");
    endScreen.hidden = true;
    endScreen.style.display = "none";

    cancelAnimationFrame(animationFrameId);

    stopAllSounds();
    clearAllIntervals();

    showPlayingStage();
    init();
}

window.addEventListener("keydown", (e) => setKeyFromEvent(e, true));

window.addEventListener("keyup", (e) => setKeyFromEvent(e, false));

document.addEventListener("DOMContentLoaded", () => {
    initStartScreenControls();
    bindTouchControls();
});
