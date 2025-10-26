document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const plantSelection = document.getElementById('plant-selection');
    const sunCountDisplay = document.getElementById('sun-count');

    const boardWidth = 9;
    const boardHeight = 5;
    const cellSize = 60; // Should match CSS

    let suns = 50;
    let selectedPlant = null;
    let plants = [];
    let zombies = [];
    let projectiles = [];

    // Game board initialization
    function createGameBoard() {
        for (let i = 0; i < boardHeight; i++) {
            for (let j = 0; j < boardWidth; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', () => placePlant(cell));
                gameBoard.appendChild(cell);
            }
        }
    }

    // Update sun count display
    function updateSunCount() {
        sunCountDisplay.textContent = `Suns: ${suns}`;
    }

    // Plant data (will be expanded with image paths)
    const plantTypes = {
        sunflower: {
            name: 'Sunflower',
            cost: 50,
            produces: 'sun',
            health: 100,
            image: 'images/sunflower.png' // Placeholder
        },
        peashooter: {
            name: 'Peashooter',
            cost: 100,
            damage: 20,
            fireRate: 2000, // milliseconds
            health: 100,
            image: 'images/peashooter.png' // Placeholder
        }
    };

    // Create plant selection cards
    function createPlantSelection() {
        for (const key in plantTypes) {
            const plant = plantTypes[key];
            const plantCard = document.createElement('div');
            plantCard.classList.add('plant-card');
            plantCard.dataset.plantType = key;
            plantCard.innerHTML = `
                <img src="${plant.image}" alt="${plant.name}" style="width: 50px; height: 50px;">
                <p>${plant.name}</p>
                <p>Cost: ${plant.cost}</p>
            `;
            plantCard.addEventListener('click', () => selectPlant(key));
            plantSelection.appendChild(plantCard);
        }
    }

    // Select a plant
    function selectPlant(type) {
        if (selectedPlant === type) {
            selectedPlant = null;
        } else {
            selectedPlant = type;
        }
        updatePlantSelectionUI();
    }

    // Update plant selection UI
    function updatePlantSelectionUI() {
        document.querySelectorAll('.plant-card').forEach(card => {
            if (card.dataset.plantType === selectedPlant) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    }

    // Place a plant
    function placePlant(cell) {
        if (!selectedPlant) return;

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        // Check if a plant already exists in this cell
        const existingPlant = plants.find(p => p.row === row && p.col === col);
        if (existingPlant) return;

        const plantData = plantTypes[selectedPlant];
        if (suns >= plantData.cost) {
            suns -= plantData.cost;
            updateSunCount();

            const newPlant = {
                type: selectedPlant,
                row: row,
                col: col,
                health: plantData.health,
                element: document.createElement('div')
            };
            newPlant.element.classList.add('plant');
            newPlant.element.style.backgroundImage = `url(${plantData.image})`;
            cell.appendChild(newPlant.element);
            plants.push(newPlant);

            selectedPlant = null; // Deselect after placing
            updatePlantSelectionUI();

            // Start plant-specific actions
            if (newPlant.type === 'sunflower') {
                startSunProduction(newPlant);
            } else if (newPlant.type === 'peashooter') {
                startShooting(newPlant);
            }
        } else {
            alert('Not enough suns!');
        }
    }

    // Placeholder for sun production
    function startSunProduction(plant) {
        setInterval(() => {
            suns += 25; // Example: Sunflower produces 25 suns
            updateSunCount();
        }, 10000); // Every 10 seconds
    }

    // Placeholder for shooting
    function startShooting(plant) {
        setInterval(() => {
            // Logic to create and move projectiles
        }, plantTypes.peashooter.fireRate);
    }

    // Initial setup
    createGameBoard();
    createPlantSelection();
    updateSunCount();
});