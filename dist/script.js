document.addEventListener('DOMContentLoaded', function() {
      const gameContainer = document.getElementById('game-container');
      const scoreDisplay = document.getElementById('score-display');
      const timeDisplay = document.getElementById('time-display');
      const infoPanel = document.getElementById('info-panel');

      let score = 0;
      let timeLeft = 60;
      let timerInterval;

      function startGame() {
        timerInterval = setInterval(function() {
          timeLeft--;
          timeDisplay.textContent = `Time: ${timeLeft}`;
          if (timeLeft === 0) {
            clearInterval(timerInterval);
            endGame();
          }
        }, 1000);

        createTarget();
      }

      function createTarget() {
        const target = document.createElement('div');
        target.className = 'target';
        const isRed = Math.random() < 0.7; // 70% chance to be red
        target.classList.add(isRed ? 'red' : 'blue');
        target.textContent = isRed ? '+' : '++';

        const x = Math.random() * (gameContainer.clientWidth - 50);
        const y = Math.random() * (gameContainer.clientHeight - 50);
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
        gameContainer.appendChild(target);

        target.addEventListener('click', function() {
          const clickSound = new Audio('click.mp3'); // Replace with your audio file
          clickSound.play();

          gameContainer.removeChild(target);
          score += isRed ? 1 : 2; // Red targets score 1, blue targets score 2
          scoreDisplay.textContent = `Score: ${score}`;

          // Add animation effect on click
          target.style.transform = 'scale(1.5)';
          setTimeout(() => {
            target.style.transform = 'scale(1)';
          }, 200);

          createTarget(); // Create a new target after clicking
        });

        setTimeout(() => {
          gameContainer.removeChild(target);
          createTarget(); // Recreate target if not clicked in time
        }, Math.random() * 4000 + 1000); // Random time between 1 to 5 seconds
      }

      function endGame() {
        gameContainer.innerHTML = ''; // Clear game container
        const gameOverMsg = document.createElement('h1');
        gameOverMsg.textContent = `Game Over! Your score is ${score}`;
        gameOverMsg.style.textAlign = 'center';
        gameOverMsg.style.marginTop = '50px';
        gameContainer.appendChild(gameOverMsg);

        const restartBtn = document.createElement('button');
        restartBtn.textContent = 'Restart Game';
        restartBtn.style.display = 'block';
        restartBtn.style.margin = '20px auto';
        restartBtn.addEventListener('click', function() {
          score = 0;
          scoreDisplay.textContent = `Score: ${score}`;
          timeLeft = 60;
          timeDisplay.textContent = `Time: ${timeLeft}`;
          gameContainer.removeChild(gameOverMsg);
          restartBtn.parentNode.removeChild(restartBtn);
          startGame();
        });
        gameContainer.appendChild(restartBtn);
      }

      startGame();
    });