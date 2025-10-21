const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const gridSize = 4;
let board = [];
let score = 0;

function initializeGame() {
    board = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));
    score = 0;
    scoreDisplay.textContent = score;
    addRandomTile();
    addRandomTile();
    renderBoard();
}

function renderBoard() {
    gameBoard.innerHTML = '';
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            const tileValue = board[r][c];
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (tileValue > 0) {
                tile.textContent = tileValue;
                tile.classList.add(`tile-${tileValue}`);
            }
            gameBoard.appendChild(tile);
        }
    }
}

function addRandomTile() {
    let emptyTiles = [];
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (board[r][c] === 0) {
                emptyTiles.push({ r, c });
            }
        }
    }
    if (emptyTiles.length > 0) {
        const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function slide(row) {
    let arr = row.filter(val => val !== 0);
    let missing = gridSize - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
}

function combine(row) {
    for (let i = gridSize - 1; i > 0; i--) {
        if (row[i] === row[i - 1] && row[i] !== 0) {
            row[i] *= 2;
            score += row[i];
            row[i - 1] = 0;
        }
    }
    scoreDisplay.textContent = score;
    return row;
}

function operate(row) {
    let newRow = slide(row);
    newRow = combine(newRow);
    newRow = slide(newRow);
    return newRow;
}

function transpose(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

function move(direction) {
    let changed = false;
    let oldBoard = JSON.parse(JSON.stringify(board)); // Deep copy

    if (direction === 'left' || direction === 'right') {
        for (let r = 0; r < gridSize; r++) {
            let row = board[r];
            if (direction === 'left') {
                row.reverse(); // For left, treat as right then reverse back
            }
            let newRow = operate(row);
            if (direction === 'left') {
                newRow.reverse();
            }
            if (JSON.stringify(board[r]) !== JSON.stringify(newRow)) {
                changed = true;
            }
            board[r] = newRow;
        }
    } else if (direction === 'up' || direction === 'down') {
        board = transpose(board);
        for (let c = 0; c < gridSize; c++) {
            let col = board[c];
            if (direction === 'up') {
                col.reverse(); // For up, treat as down then reverse back
            }
            let newCol = operate(col);
            if (direction === 'up') {
                newCol.reverse();
            }
            if (JSON.stringify(board[c]) !== JSON.stringify(newCol)) {
                changed = true;
            }
            board[c] = newCol;
        }
        board = transpose(board);
    }

    if (changed) {
        addRandomTile();
        renderBoard();
        checkGameOver();
    }
}

function checkGameOver() {
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (board[r][c] === 0) {
                return; // Game not over if there's an empty tile
            }
            // Check for possible merges horizontally
            if (c < gridSize - 1 && board[r][c] === board[r][c + 1]) {
                return; // Game not over if horizontal merge possible
            }
            // Check for possible merges vertically
            if (r < gridSize - 1 && board[r][c] === board[r + 1][c]) {
                return; // Game not over if vertical merge possible
            }
        }
    }
    // If no empty tiles and no possible merges
    setTimeout(() => alert('Game Over!'), 100);
}

document.addEventListener('keydown', e => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        switch (e.key) {
            case 'ArrowUp':
                move('up');
                break;
            case 'ArrowDown':
                move('down');
                break;
            case 'ArrowLeft':
                move('left');
                break;
            case 'ArrowRight':
                move('right');
                break;
        }
    }
});

restartButton.addEventListener('click', initializeGame);

initializeGame();