const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return true;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = `Game ended in a draw!`;
        gameActive = false;
        return true;
    }

    return false;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
}

function makeAIMove() {
    if (!gameActive) return;

    // Minimax algorithm for unbeatable AI
    function findBestMove() {
        let bestVal = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === '') {
                gameState[i] = 'O'; // Try AI's move
                let moveVal = minimax(gameState, 0, false);
                gameState[i] = ''; // Undo the move
                if (moveVal > bestVal) {
                    bestVal = moveVal;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    }

    function minimax(boardState, depth, isMaximizingPlayer) {
        let score = evaluate(boardState);

        if (score === 10) return score - depth;
        if (score === -10) return score + depth;
        if (!boardState.includes('')) return 0; // Draw

        if (isMaximizingPlayer) {
            let best = -Infinity;
            for (let i = 0; i < boardState.length; i++) {
                if (boardState[i] === '') {
                    boardState[i] = 'O';
                    best = Math.max(best, minimax(boardState, depth + 1, !isMaximizingPlayer));
                    boardState[i] = '';
                }
            }
            return best;
        } else {
            let best = Infinity;
            for (let i = 0; i < boardState.length; i++) {
                if (boardState[i] === '') {
                    boardState[i] = 'X';
                    best = Math.min(best, minimax(boardState, depth + 1, !isMaximizingPlayer));
                    boardState[i] = '';
                }
            }
            return best;
        }
    }

    function evaluate(boardState) {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                if (boardState[a] === 'O') return 10;
                else if (boardState[a] === 'X') return -10;
            }
        }
        return 0;
    }

    const bestMove = findBestMove();
    if (bestMove !== -1) {
        gameState[bestMove] = 'O';
        cells[bestMove].innerHTML = 'O';
        cells[bestMove].classList.add('playerO');
        if (!handleResultValidation()) {
            handlePlayerChange();
        }
    }
}


function handleClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(`player${currentPlayer}`);

    if (handleResultValidation()) {
        return;
    }

    handlePlayerChange();

    if (currentPlayer === 'O') {
        makeAIMove();
    }
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('playerX', 'playerO');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', handleRestartGame);
statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;