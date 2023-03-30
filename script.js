let cells = document.querySelectorAll(".cell");
let result = document.getElementById("result");
let resetBtn = document.getElementById("reset-btn");
let currentPlayer = "X";
let playerXScore = localStorage.getItem('playerXScore') || 0;
let playerOScore = localStorage.getItem('playerOScore') || 0;

function updateScore() {
    if (currentPlayer === 'X') {
        playerXScore++;
        document.getElementById('player-x-score').textContent = playerXScore;
        localStorage.setItem('playerXScore', playerXScore);
    } else {
        playerOScore++;
        document.getElementById('player-o-score').textContent = playerOScore;
        localStorage.setItem('playerOScore', playerOScore);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('player-x-score').textContent = playerXScore;
    document.getElementById('player-o-score').textContent = playerOScore;
});

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

resetBtn.addEventListener("click", resetGame);

function handleClick() {
    if (this.textContent === "") {
        this.textContent = currentPlayer;
        if (checkWin()) {
            result.textContent = `${currentPlayer} wins!`;
            disableCells();
        } else if (checkDraw()) {
            result.textContent = "Draw!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWin() {
    let winner = winningCombos.find(combo => {
        return combo.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });

    if (winner) {
        result.textContent = `${currentPlayer} wins!`;
        disableCells();
        updateScore();
        return true;
    }

    return checkDraw();
}

function updateScore() {
    if (currentPlayer === 'X') {
        playerXScore++;
        document.getElementById('player-x-score').textContent = playerXScore;
    } else {
        playerOScore++;
        document.getElementById('player-o-score').textContent = playerOScore;
    }
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.textContent !== "";
    });
}

function disableCells() {
    cells.forEach(cell => {
        cell.style.cursor = "not-allowed";
        cell.removeEventListener("click", handleClick);
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.cursor = "pointer";
        cell.addEventListener("click", handleClick);
    });
    result.textContent = "";
    currentPlayer = "X";
}

resetGame();

document.getElementById('reset-score-btn').addEventListener('click', () => {
    localStorage.setItem('playerXScore', 0);
    localStorage.setItem('playerOScore', 0);
    playerXScore = 0;
    playerOScore = 0;
    document.getElementById('player-x-score').textContent = playerXScore;
    document.getElementById('player-o-score').textContent = playerOScore;
});