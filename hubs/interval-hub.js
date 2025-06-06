let gameIntervals = [];

function addGameInterval(interval) {
    gameIntervals.push(interval);
}

function clearAllIntervals() {
    gameIntervals.forEach(clearInterval);
    gameIntervals = [];
}