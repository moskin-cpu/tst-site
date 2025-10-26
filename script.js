document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const gridSize = 9; // 9 columns
    const numRows = 5; // 5 rows
    const cellSize = 60; // size of each cell in pixels

    let plants = [];
    let zombies = [];
    let suns = 0;
    let gameInterval;

    // Create game grid
    function createGrid() {
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                gameContainer.appendChild(cell);
            }
        }
    }

    // Initialize game
    function initGame() {
        createGrid();
        // More game initialization logic will go here later
        // e.g., spawn initial sun, start zombie spawning
    }

    initGame();
});
