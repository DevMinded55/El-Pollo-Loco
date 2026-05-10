/**
 * Tracks interval IDs created for the game loop; cleared on restart/end.
 * @type {number[]}
 */
let gameIntervals = [];

/**
 * @param {function(): void} func
 * @param {number} time
 * @returns {number}
 */
function addGameInterval(func, time) {
    const id = setInterval(func, time);
    gameIntervals.push(id);
    return id;
}

/** Stops every interval registered via addGameInterval. */
function clearAllIntervals() {
    gameIntervals.forEach(clearInterval);
    gameIntervals = [];
}