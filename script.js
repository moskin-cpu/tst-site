
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function handleCellClick() {
    const cellIndex = parseInt(this.getAttribute("data-cell-index"));

    if (board[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();

    if (running && currentPlayer === "O") { // Only call AI if game is still running and it's AI's turn
        setTimeout(handleAIMove, 500); // Delay AI move for better user experience
    }
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!board.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

function handleAIMove() {
    if (!running) {
        return;
    }

    let bestMove = getBestAIMove();

    if (bestMove !== -1) {
        const cell = cells[bestMove];
        updateCell(cell, bestMove);
        checkWinner();
    }
}

function getBestAIMove() {
    let bestScore = -Infinity;
    let move = -1;
    let availableMoves = [];

    // Find all available moves first
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            availableMoves.push(i);
        }
    }

    if (availableMoves.length === 0) {
        return -1; // Should not happen if game is running
    }

    // Default to the first available move as a fallback
    move = availableMoves[0];

    // Now, run minimax to find the optimal move
    for (let i = 0; i < availableMoves.length; i++) {
        const currentMove = availableMoves[i];
        board[currentMove] = "O"; // Try AI's move
        let score = minimax(board, 0, true); // AI is maximizing player
        board[currentMove] = ""; // Undo move
        if (score > bestScore) {
            bestScore = score;
            move = currentMove;
        }
    }
    return move;
}

function minimax(currentBoard, depth, isMaximizingPlayer) {
    let score = evaluate(currentBoard);

    if (score !== 0) {
        return score;
    }

    if (!currentBoard.includes("")) {
        return 0; // Draw
    }

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === "") {
                currentBoard[i] = "O";
                bestScore = Math.max(bestScore, minimax(currentBoard, depth + 1, false));
                currentBoard[i] = "";
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === "") {
                currentBoard[i] = "X";
                bestScore = Math.min(bestScore, minimax(currentBoard, depth + 1, true));
                currentBoard[i] = "";
            }
        }
        return bestScore;
    }
}

function evaluate(currentBoard) {
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = currentBoard[condition[0]];
        const cellB = currentBoard[condition[1]];
        const cellC = currentBoard[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            if (cellA === "O") {
                return 10; // AI wins
            } else if (cellA === "X") {
                return -10; // Player wins
            }
        }
    }
    return 0; // No winner
}
