let player = document.getElementById('player');
let gameOverScreen = document.getElementById('game-over');
let playAgainButton = document.getElementById('play-again');
let isGameOver = false;
let velocityX = 0;  // Horizontal speed
let friction = 0.51; // Friction to slow down movement
let moveSpeed = 2.5;  // Speed of movement

// Movement controls
let isMovingLeft = false;
let isMovingRight = false;

document.addEventListener('keydown', (e) => {
  if (isGameOver) return;  // No movement if the game is over
  
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    isMovingLeft = true;
  }
  if (e.key === 'ArrowRight' || e.key === 'd') {
    isMovingRight = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    isMovingLeft = false;
  }
  if (e.key === 'ArrowRight' || e.key === 'd') {
    isMovingRight = false;
  }
});

// Game loop
function gameLoop() {
  if (isGameOver) return;

  // Handle movement
  if (isMovingLeft) {
    velocityX = -moveSpeed;
  } else if (isMovingRight) {
    velocityX = moveSpeed;
  } else {
    velocityX *= 1 - friction;  // Apply friction when no key is pressed
  }

  // Update player position
  let playerX = parseFloat(player.style.left || '50%');
  playerX += velocityX;
  
  // Prevent going off-screen
  playerX = Math.max(0, Math.min(playerX, 100));

  player.style.left = playerX + '%';

  requestAnimationFrame(gameLoop);
}

// Game Over logic
function gameOver() {
  isGameOver = true;
  gameOverScreen.style.display = 'block';
}

// Restart game
playAgainButton.addEventListener('click', () => {
  isGameOver = false;
  gameOverScreen.style.display = 'none';
  velocityX = 0;
  player.style.left = '50%';  // Reset player position
  gameLoop();
});

// Start the game loop immediately
gameLoop();
