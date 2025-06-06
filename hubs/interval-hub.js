let gameIntervals = [];

function addGameInterval(func, time) {
    const id = setInterval(func, time);
    gameIntervals.push(id);
    console.log(gameIntervals);
    
    return id;
}

function clearAllIntervals() {
    gameIntervals.forEach(clearInterval);
    gameIntervals = [];
}