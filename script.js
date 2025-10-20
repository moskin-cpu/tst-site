const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const cells = document.querySelectorAll('.cell');

let gameActive = true;
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

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

const handleStatusDisplay = (message) => {
    statusDisplay.innerHTML = message;
};

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer);
};

const handlePlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    handleStatusDisplay(`Player ${currentPlayer}'s Turn`);
};

const checkResult = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        handleStatusDisplay(`Player ${currentPlayer} Has Won!`);
        gameActive = false;
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        handleStatusDisplay('Game Ended in a Draw!');
        gameActive = false;
        return;
    }

    handlePlayerChange();
};

const makeAIMove = () => {
    if (!gameActive) return;
    handleStatusDisplay("AI's Turn...");

    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = ''; // undo move
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    if (bestMove !== null) {
        setTimeout(() => {
            cells[bestMove].click();
        }, 500);
    }
};

const scores = {
    X: -10,
    O: 10,
    tie: 0
};

const minimax = (newBoard, depth, isMaximizing) => {
    let result = checkTerminalState(newBoard);
    if (result !== null) {
        return scores[result] - depth; // Adjust score for depth
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = 'O';
                let score = minimax(newBoard, depth + 1, false);
                newBoard[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = 'X';
                let score = minimax(newBoard, depth + 1, true);
                newBoard[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

const checkTerminalState = (currentBoard) => {
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = currentBoard[winCondition[0]];
        let b = currentBoard[winCondition[1]];
        let c = currentBoard[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            return a; // 'X' or 'O' winner
        }
    }

    if (!currentBoard.includes('')) {
        return 'tie';
    }

    return null; // Game is not over
};

const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

    if (board[clickedCellIndex] !== '' || !gameActive || currentPlayer === 'O') {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    checkResult();

    if (gameActive && currentPlayer === 'O') {
        makeAIMove();
    }
};

const handleResetGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    handleStatusDisplay(`Player ${currentPlayer}'s Turn`);
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('X', 'O');
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);

handleStatusDisplay(`Player ${currentPlayer}'s Turn`);