//Players//
let playerNameX = "Player X";
let playerNameO = "Player O";

let timerSeconds = 0;
let timerInterval = null;

// variables//
let board = ["","","","","","","","","",];
let currentPlayer = "X";
let gameActive = true;
let cells = document.querySelectorAll(".cell");

//score//
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;
function checkWinner(){
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    for (let pattern of winPatterns) {
        const [a,b,c] = pattern;
        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
            return board[a];

        }
    }
    return null;
}

function checkDraw() {
    return board.every(cell => cell !== "");
    }
    function updateScoreDisplay() {
        let scoreDiv = document.getElementById("scoreDisplay");
        if (!scoreDiv) {
            scoreDiv = document.createElement("div");
            scoreDiv.id = "scoreDisplay";
            scoreDiv.style.margin = "20px";
            scoreDiv.style.fontSize = "1.2rem";
            const boardDiv = document.querySelector(".board");
            boardDiv.parentNode.insertBefore(scoreDiv, boardDiv.nextSibling);
        }
        scoreDiv.innerHTML = `🥇 X: ${scoreX} &nbsp;&nbsp; | &nbsp;&nbsp; O: ${scoreO} 
        &nbsp;&nbsp; | &nbsp;&nbsp; 🤝 Draw: ${scoreDraw}`;
    }
    function endGame(winner) {
        gameActive = false;
        stopTimer();
        let message = "";
        if (winner === "X") {
            scoreX++;
            message = `🥳 ${playerNameX} (X) wins! 🥳`;
        } else if (winner === "O") {
            scoreO++;
            message = `🥳 ${playerNameO} (O) wins! 🥳`;
        } else if (winner === "draw") {
            scoreDraw++;
            message = "🤝 It is a draw! 🤝";
        }
        alert(message);
        updateScoreDisplay();
    }
//function cells//
function handleCellClick(index) {
    if (!gameActive) return;
    if (board[index] !== "") return;
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    const winner = checkWinner();
    if (winner) {
        endGame(winner);
        return;
    }
    if (checkDraw()) {
        endGame("draw");
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    console.log(`Turn of: ${currentPlayer}`);
}
function restartGame() {
    board = ["","","","","","","","","",];
    cells.forEach(cell => cell.textContent = "");
    gameActive = true;
    currentPlayer = "X";
    resetTimer();
    console.log("Restart Game. Turn of X");
}
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
});
updateScoreDisplay();
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (gameActive) {
            timerSeconds++;
            const timerDisplay = document.getElementById("timerDisplay");
            if (timerDisplay) timerDisplay.textContent = timerSeconds;
        }
    }, 1000);
}
function stopTimer(){
    if (timerInterval){
        clearInterval(timerInterval);
        timerInterval = null;
    }
}
function resetTimer() {
    stopTimer();
    timerSeconds = 0;
    const timerDisplay = document.getElementById("timerDisplay");
    if (timerDisplay) timerDisplay.textContent = "0";
    if (gameActive) startTimer();
}
function setNames() {
    const inputX = document.getElementById("nameX");
    const inputO = document.getElementById("nameO");
    if (inputX.value.trim() !== "") playerNameX = inputX.value.trim();
    if (inputO.value.trim() !== "") playerNameO = inputO.value.trim();
    console.log(`Names updated: X = ${playerNameX}, O = ${playerNameO}`);
}
const restartBtn = document.getElementById("restartButton");
if (restartBtn) {
    restartBtn.addEventListener("click", () => {
        restartGame();
    });
}
const enterNameBtn = document.getElementById("enterNameBtn");
if (enterNameBtn) {
    enterNameBtn.addEventListener("click", () =>{
        setNames();
    });
}
if (gameActive) {
    startTimer();
}