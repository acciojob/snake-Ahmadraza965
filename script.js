//your code here
    document.addEventListener('DOMContentLoaded', () => {
      const gameContainer = document.getElementById('gameContainer');
      const scoreElement = document.getElementById('score');

      const width = 40;
      const height = 40;
      const totalPixels = width * height;

      const pixels = Array.from({ length: totalPixels }, (_, index) => index + 1);

      let snake = [801, 802, 803]; // Initial snake positions (col-row format)
      let direction = 'right'; // Initial direction
      let food = generateFood(); // Generate initial food position
      let score = 0;

      // Render initial snake and food
      renderSnake();
      renderFood();

      // Move the snake every 100ms
      const intervalId = setInterval(moveSnake, 100);

      // Handle keyboard arrow keys
      document.addEventListener('keydown', handleKeyPress);

      function renderSnake() {
        // Clear previous snake positions
        gameContainer.querySelectorAll('.snakeBodyPixel').forEach(pixel => {
          pixel.classList.remove('snakeBodyPixel');
        });

        // Render current snake positions
        snake.forEach(position => {
          const pixel = document.getElementById(`pixel${position}`);
          pixel.classList.add('snakeBodyPixel');
        });
      }

      function renderFood() {
        // Clear previous food position
        const previousFood = gameContainer.querySelector('.food');
        if (previousFood) {
          previousFood.classList.remove('food');
        }

        // Render current food position
        const pixel = document.getElementById(`pixel${food}`);
        pixel.classList.add('food');
      }

      function moveSnake() {
        const head = snake[0];
        let newHead;

        // Calculate the new head position based on the current direction
        switch (direction) {
          case 'up':
            newHead = head - width;
            break;
          case 'down':
            newHead = head + width;
            break;
          case 'left':
            newHead = head - 1;
            break;
          case 'right':
            newHead = head + 1;
            break;
        }

        // Check for collision with walls or snake body
        if (isCollision(newHead) || isCollisionWithSnake(newHead)) {
          clearInterval(intervalId);
          alert('Game over!');
          return;
        }

        // Add the new head to the snake array
        snake.unshift(newHead);

        // Check if the snake eats the food
        if (newHead === food) {
          // Generate new food position
          food = generateFood();
          // Increase score
          score += 10;
          scoreElement.textContent = score;
        } else {
          // Remove the tail segment if the snake didn't eat the food
          snake.pop();
        }

        // Render the updated snake
        renderSnake();
      }

      function handleKeyPress(event) {
        // Change the direction based on the pressed arrow key
        switch (event.key) {
          case 'ArrowUp':
            direction = 'up';
            break;
          case 'ArrowDown':
            direction = 'down';
            break;
          case 'ArrowLeft':
            direction = 'left';
            break;
          case 'ArrowRight':
            direction = 'right';
            break;
        }
      }

      function generateFood() {
        let randomPixel;
        do {
          randomPixel = pixels[Math.floor(Math.random() * totalPixels)];
        } while (isCollisionWithSnake(randomPixel));

        return randomPixel;
      }

      function isCollision(position) {
        const col = (position - 1) % width;
        const row = Math.floor((position - 1) / width);
        return col < 0 || col >= width || row < 0 || row >= height;
      }

      function isCollisionWithSnake(position) {
        return snake.includes(position);
      }
    });