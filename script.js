document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const gridSize = 9; // 9 columns
    const numRows = 5; // 5 rows
    const cellSize = 60; // size of each cell in pixels

    let plants = [];
    let zombies = [];
    let suns = 100; // Starting suns
    let gameInterval;
    let zombieSpawnInterval;

    // --- Game Objects ---
    class Plant {
        constructor(row, col, type) {
            this.row = row;
            this.col = col;
            this.type = type; // e.g., 'sunflower', 'peashooter'
            this.health = 100;
            this.attack = 0;
            this.cost = 50; // default cost
            this.element = this.createPlantElement();
            gameContainer.appendChild(this.element);
            this.setPosition();
        }

        createPlantElement() {
            const plantEl = document.createElement('div');
            plantEl.classList.add('plant', this.type);
            return plantEl;
        }

        setPosition() {
            this.element.style.left = `${this.col * cellSize}px`;
            this.element.style.top = `${this.row * cellSize}px`;
        }

        takeDamage(amount) {
            this.health -= amount;
            if (this.health <= 0) {
                this.element.remove();
                plants = plants.filter(p => p !== this);
            }
        }
    }

    class Zombie {
        constructor(row) {
            this.row = row;
            this.col = gridSize - 1; // Start at the rightmost column
            this.health = 150;
            this.attack = 10;
            this.speed = 0.5; // pixels per game tick
            this.element = this.createZombieElement();
            gameContainer.appendChild(this.element);
            this.setPosition();
        }

        createZombieElement() {
            const zombieEl = document.createElement('div');
            zombieEl.classList.add('zombie');
            return zombieEl;
        }

        setPosition() {
            this.element.style.left = `${this.col * cellSize}px`;
            this.element.style.top = `${this.row * cellSize}px`;
        }

        move() {
            this.col -= this.speed / cellSize; // Update column based on speed
            this.setPosition();
            if (this.col < 0) {
                // Game over condition (zombie reached the house)
                console.log('Game Over!');
                clearInterval(gameInterval);
                clearInterval(zombieSpawnInterval);
                alert('Game Over! A zombie reached your house!');
            }
        }

        attackPlant(plant) {
            plant.takeDamage(this.attack);
            console.log(`Zombie attacked plant at (${plant.row}, ${plant.col}). Plant health: ${plant.health}`);
        }
    }

    // --- Game Logic ---
    function createGrid() {
        gameContainer.style.width = `${gridSize * cellSize}px`;
        gameContainer.style.height = `${numRows * cellSize}px`;
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.style.width = `${cellSize}px`;
                cell.style.height = `${cellSize}px`;
                gameContainer.appendChild(cell);

                cell.addEventListener('click', () => placePlant(i, j));
            }
        }
    }

    function placePlant(row, col) {
        // For now, let's just place a generic plant if we have enough suns
        if (suns >= 50 && !plants.some(p => p.row === row && p.col === col)) {
            const newPlant = new Plant(row, col, 'peashooter'); // Placeholder type
            plants.push(newPlant);
            suns -= newPlant.cost;
            updateSunDisplay();
            console.log(`Plant placed at (${row}, ${col}). Suns remaining: ${suns}`);
        } else {
            console.log('Cannot place plant: not enough suns or cell occupied.');
        }
    }

    function spawnZombie() {
        const randomRow = Math.floor(Math.random() * numRows);
        const newZombie = new Zombie(randomRow);
        zombies.push(newZombie);
        console.log(`Zombie spawned in row ${randomRow}`);
    }

    function updateSunDisplay() {
        // We'll need a div in index.html to display suns
        let sunDisplay = document.getElementById('sun-display');
        if (!sunDisplay) {
            sunDisplay = document.createElement('div');
            sunDisplay.id = 'sun-display';
            document.body.insertBefore(sunDisplay, gameContainer);
        }
        sunDisplay.textContent = `Suns: ${Math.floor(suns)}`;
    }

    function gameLoop() {
        // Move zombies and check for collisions
        zombies.forEach(zombie => {
            zombie.move();

            // Check for collision with plants
            plants.forEach(plant => {
                if (zombie.row === plant.row && Math.floor(zombie.col) === plant.col) {
                    zombie.attackPlant(plant);
                }
            });
        });

        // Add more game logic here, e.g., plant attacks, sun generation
    }

    function initGame() {
        createGrid();
        updateSunDisplay();
        gameInterval = setInterval(gameLoop, 100); // Game updates every 100ms
        zombieSpawnInterval = setInterval(spawnZombie, 5000); // Spawn a zombie every 5 seconds
    }

    initGame();
});
