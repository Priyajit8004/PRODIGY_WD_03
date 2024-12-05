const board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

document.querySelectorAll('.cell').forEach((cell, index) => {
  cell.addEventListener('click', () => handleMove(index, cell));
});

function handleMove(index, cell) {
  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin(currentPlayer)) {
    alert(`${currentPlayer} wins!`);
    gameActive = false;
  } else if (board.every(cell => cell)) {
    alert('Draw!');
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],           // Diagonals
  ];
  return winPatterns.some(pattern => pattern.every(i => board[i] === player));
}

document.getElementById('reset').addEventListener('click', () => {
  board.fill(null);
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  gameActive = true;
});
