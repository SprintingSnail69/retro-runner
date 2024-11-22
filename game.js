const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('gameOver');
const gameContainer = document.getElementById('gameContainer');

let score = 0;
let gameOver = false;
let powerUpActive = false;
let playerSpeed = 5;
let gameInterval, obstacleInterval, powerUpInterval;

const startGame = () => {
    score = 0;
    playerSpeed = 5;
    gameOver = false;
    powerUpActive = false;
    gameOverDisplay.style.display = 'none';
    scoreDisplay.innerText = `Score: ${score}`;
    player.style.bottom = '10px';
    player.style.left = '50px';  // Start at the left of the screen
    gameInterval = setInterval(gameLoop, 1000 / 60); // 60 FPS
    obstacleInterval = setInterval(spawnObstacle, 2000); // Obstacles every 2 seconds
    powerUpInterval = setInterval(spawnPowerUp, 5000); // Power-ups every 5 seconds
};

const gameLoop = () => {
    if (gameOver) return clearInterval(gameInterval);

    // Move obstacles, check for collisions, etc.
    // Update score
    score++;
    scoreDisplay.innerText = `Score: ${score}`;

    // Check for power-up
    if (powerUpActive) {
        playerSpeed = 10;
    }
};

const spawnObstacle = () => {
    const obstacle = document.createElement('div');
    obstacle.style.position = 'absolute';
    obstacle.style.width = '30px';
    obstacle.style.height = '30px';
    obstacle.style.backgroundColor = 'red';
    obstacle.style.left = `${Math.random() * (gameContainer.clientWidth - 30)}px`;
    obstacle.style.top = '-30px';
    gameContainer.appendChild(obstacle);
    
    let obstacleSpeed = 3;
    const moveObstacle = setInterval(() => {
        if (parseInt(obstacle.style.top) > gameContainer.clientHeight) {
            clearInterval(moveObstacle);
            gameContainer.removeChild(obstacle);
        } else {
            obstacle.style.top = `${parseInt(obstacle.style.top) + obstacleSpeed}px`;

            if (collisionDetection(player, obstacle)) {
                gameOver = true;
                gameOverDisplay.style.display = 'block';
                clearInterval(gameInterval);
                clearInterval(obstacleInterval);
                clearInterval(powerUpInterval);
            }
        }
    }, 1000 / 60);
};

const spawnPowerUp = () => {
    const powerUp = document.createElement('div');
    powerUp.classList.add('power-up');
    powerUp.style.left = `${Math.random() * (gameContainer.clientWidth - 20)}px`;
    powerUp.style.top = '-20px';
    gameContainer.appendChild(powerUp);

    let powerUpSpeed = 2;
    const movePowerUp = setInterval(() => {
        if (parseInt(powerUp.style.top) > gameContainer.clientHeight) {
            clearInterval(movePowerUp);
            gameContainer.removeChild(powerUp);
        } else {
            powerUp.style.top = `${parseInt(powerUp.style.top) + powerUpSpeed}px`;

            if (collisionDetection(player, powerUp)) {
                powerUpActive = true;
                setTimeout(() => powerUpActive = false, 5000); // Power-up lasts 5 seconds
                gameContainer.removeChild(powerUp);
            }
        }
    }, 1000 / 60);
};

const collisionDetection = (player, element) => {
    const playerRect = player.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    return !(playerRect.right < elementRect.left || 
             playerRect.left > elementRect.right || 
             playerRect.bottom < elementRect.top || 
             playerRect.top > elementRect.bottom);
};

document.addEventListener('keydown', (e) => {
    // Move left and right
    if (e.key === 'ArrowLeft' && parseInt(player.style.left) > 0) {
        player.style.left = `${parseInt(player.style.left) - 10}px`;  // Move left
    }
    if (e.key === 'ArrowRight' && parseInt(player.style.left) < gameContainer.clientWidth - 30) {
        player.style.left = `${parseInt(player.style.left) + 10}px`;  // Move right
    }

    // Jump with spacebar
    if (e.key === ' ' && !gameOver) {
        player.style.bottom = `${parseInt(player.style.bottom) + 50}px`;
        setTimeout(() => player.style.bottom = '10px', 300);  // Jump back down after 300ms
    }
});

startGame();
