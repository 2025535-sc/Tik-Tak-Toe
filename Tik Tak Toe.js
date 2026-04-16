const grid = document.getElementById('grid');
const turnDisplay = document.getElementById('turn');
const timeDisplay = document.getElementById('time');
const playerXDisplay = document.getElementById('playerX');
const playerODisplay = document.getElementById('playerO');

let currentPlayer = 'X';
let board = Array(9).fill('');
let gameActive = false;
let players = { X: '', O: '' };
let scores = { X: 0, O: 0, draw: 0 };
let timer = 0;
let interval;
let nameTurn = 'X';

// Create grid
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('button');
  cell.classList.add('cell');
  cell.dataset.index = i;
  cell.addEventListener('click', handleMove);
  grid.appendChild(cell);
}

// Name entry
document.getElementById('addName').addEventListener('click', () => {
  const input = document.getElementById('nameInput');
  const name = input.value.trim();
  if (!name) return;

  players[nameTurn] = name;

  if (nameTurn === 'X') {
    playerXDisplay.textContent = name;
    nameTurn = 'O';
  } else {
    playerODisplay.textContent = name;
    gameActive = true;
    grid.classList.remove('disabled');
    startTimer();
  }

  input.value = '';
});

function handleMove(e) {
  const index = e.target.dataset.index;

  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) return;

  if (board.every(cell => cell !== '')) {
    endGame('draw');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  turnDisplay.textContent = currentPlayer;
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      endGame(board[a]);
      return true;
    }
  }
  return false;
}

function endGame(result) {
  gameActive = false;
  clearInterval(interval);

  if (result === 'draw') {
    scores.draw++;
    document.getElementById('draws').textContent = scores.draw;
    alert('Draw!');
  } else {
    scores[result]++;
    document.getElementById('score' + result).textContent = scores[result];
    alert(players[result] + ' wins!');
  }
}

document.getElementById('restart').addEventListener('click', () => {

  if (!players.X || !players.O) {
    alert("Enter both player names first!");
    return;
  }

  board.fill('');
  document.querySelectorAll('.cell').forEach(c => c.textContent = '');

  currentPlayer = 'X';
  turnDisplay.textContent = 'X';

  timer = 0;
  timeDisplay.textContent = '0';

  gameActive = true;
  grid.classList.remove('disabled');
  startTimer();
});

function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    timeDisplay.textContent = timer;
  }, 1000);
}
