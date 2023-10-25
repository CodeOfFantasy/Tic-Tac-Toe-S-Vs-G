var currentPlayer = 'S';
var playerScore = 0;
var computerScore = 0;
var pvcMode = false;

function startPvP() {
    pvcMode = false;
    resetGame();
}

function startPvC() {
    pvcMode = true;
    resetGame();
}

function makeMove(cell) {
    if (cell.innerHTML === '' && !checkWinner()) {
        cell.innerHTML = currentPlayer;
        currentPlayer = currentPlayer === 'S' ? 'G' : 'S';

        if (pvcMode && currentPlayer === 'G') {
            setTimeout(computerMove, 1000); // Delay for computer move
        }
    }
}

function computerMove() {
    const emptyCells = document.querySelectorAll('.cell:not(.occupied)');
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cell = emptyCells[randomIndex];
    cell.innerHTML = currentPlayer;
    currentPlayer = currentPlayer === 'S' ? 'G' : 'S';
    cell.classList.add('occupied');
    checkWinner();
}

function checkWinner() {
    const cells = document.querySelectorAll('.cell');

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

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
            if (cells[a].innerHTML === 'S') {
                playerScore++;
            } else {
                computerScore++;
            }
            updateScoreboard();
            alert(`Player ${cells[a].innerHTML} wins!`);
            return true;
        }
    }

    if ([...cells].every(cell => cell.innerHTML !== '')) {
        alert('It\'s a draw!');
        return true;
    }

    return false;
}

function updateScoreboard() {
    const playerScoreElement = document.getElementById('playerScore');
    const computerScoreElement = document.getElementById('computerScore');
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

function resetGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('occupied');
    });
    currentPlayer = 'S';
    if (pvcMode && currentPlayer === 'G') {
        setTimeout(computerMove, 1000); // Delay for computer move
    }
}
function resetScoreboard() {
	playerScore = 0;
    computerScore = 0;
    updateScoreboard();
}

function resetGameBoard() {
    const cells = document.querySelectorAll('.cell');
	cells.forEach(cell => {
		cell.innerHTML = '';
		
cell.classList.remove('occupied');
	});
	currentPlayer = 'S';
	if (pvcMode && currentPlayer === 'G') {
		 setTimeout(computerMove,1000);
	}
}