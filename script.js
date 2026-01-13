let jug1 = 0; // Current water in Jug 1 (4L capacity)
let jug2 = 0; // Current water in Jug 2 (3L capacity)

// Update the visual representation of the jugs
function updateJugs() {
    document.getElementById('water1').style.height = `${(jug1 / 4) * 100}%`;
    document.getElementById('water2').style.height = `${(jug2 / 3) * 100}%`;
}

// Fill a jug to its maximum capacity
function fillJug(jug) {
    if (jug === 1) jug1 = 4;
    else if (jug === 2) jug2 = 3;
    updateJugs();
}

// Empty a jug
function emptyJug(jug) {
    if (jug === 1) jug1 = 0;
    else if (jug === 2) jug2 = 0;
    updateJugs();
}

// Pour water from one jug to another
function pour(fromJug, toJug) {
    if (fromJug === 1 && toJug === 2) {
        const space = 3 - jug2;
        const transfer = Math.min(jug1, space);
        jug1 -= transfer;
        jug2 += transfer;
    } else if (fromJug === 2 && toJug === 1) {
        const space = 4 - jug1;
        const transfer = Math.min(jug2, space);
        jug2 -= transfer;
        jug1 += transfer;
    }
    updateJugs();
}

// Check if the target is reached
function checkWin() {
    const target = parseInt(document.getElementById('target').value);
    if (jug1 === target || jug2 === target) {
        document.getElementById('message').innerText = 'Congratulations! You solved the puzzle!';
    } else {
        document.getElementById('message').innerText = 'Keep trying!';
    }
}

// Initialize the game
updateJugs();