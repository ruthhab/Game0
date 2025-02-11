class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.player = new Player();
        this.obstacles = [];
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        this.waiting = true;
        this.paused = false;
   AdditionalFeatures
        this.victory = false;
        this.frogsToWin = Math.floor(CANVAS_WIDTH / GRID_SIZE);
        this.collisionSound = new Audio('Audio/fast-collision-reverb-14611.mp3');

   main
        
        this.initObstacles();
        this.setupEventListeners();
        this.loadHighScores();
        this.displayHighScores();
        this.gameLoop();
        
        // Show start screen initially
        document.getElementById('startScreen').classList.remove('hidden');
    }

    loadHighScores() {
        this.highScores = JSON.parse(localStorage.getItem('froggerHighScores')) || [];
    }

    saveHighScore(name, score) {
        this.highScores.push({ name, score, date: new Date().toISOString() });
        this.highScores.sort((a, b) => b.score - a.score);
        this.highScores = this.highScores.slice(0, 5); // Keep top 5 scores
        localStorage.setItem('froggerHighScores', JSON.stringify(this.highScores));
        this.displayHighScores();
    }

    displayHighScores() {
        const startScoresList = document.getElementById('startTopScores');
        const gameOverScoresList = document.getElementById('gameOverTopScores');
        
        [startScoresList, gameOverScoresList].forEach(scoresList => {
            if (scoresList) {
                scoresList.innerHTML = '';
                this.highScores.forEach(score => {
                    const li = document.createElement('li');
                    li.textContent = `${score.name}: ${score.score}`;
                    scoresList.appendChild(li);
                });
            }
        });
    }

    handleGameAction() {
        if (this.waiting) {
            this.startGame();
        } else if (this.gameOver || this.victory) {
            if (!document.querySelector('.restart-text').classList.contains('hidden')) {
                this.reset();
            }
        } else {
            this.togglePause();
        }
    }

    initObstacles() {
        // Create multiple lanes of obstacles
        const lanes = [1, 2, 3, 4, 5, 6];
        lanes.forEach(lane => {
            const y = lane * GRID_SIZE;
            const numObstacles = Math.floor(Math.random() * 2) + 2;
            const speed = getRandomSpeed();
            const width = GRID_SIZE * (Math.floor(Math.random() * 2) + 1);
            const color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
            
            for (let i = 0; i < numObstacles; i++) {
                const x = (CANVAS_WIDTH / numObstacles) * i;
                this.obstacles.push(new Obstacle(x, y, width, speed, color));
            }
        });
    }

    setupEventListeners() {
        // Movement controls
        document.addEventListener('keydown', (e) => {
            if (this.gameOver || this.waiting || this.paused || this.victory) return;
            
            switch(e.key) {
                case 'ArrowUp':
                    this.player.move('up');
                    break;
                case 'ArrowDown':
                    this.player.move('down');
                    break;
                case 'ArrowLeft':
                    this.player.move('left');
                    break;
                case 'ArrowRight':
                    this.player.move('right');
                    break;
            }
        });

        // Space bar controls
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.key === ' ') {
                e.preventDefault(); // Prevent space from scrolling page
                this.handleGameAction();
            }
        });

        // Score form submission
        document.getElementById('scoreForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('playerName');
            const name = nameInput.value.trim();
            if (name) {
                this.saveHighScore(name, this.score);
                document.getElementById('scoreForm').classList.add('hidden');
                document.querySelector('.restart-text').classList.remove('hidden');
            }
        });

        // Click controls for overlays
        ['startScreen', 'pauseScreen', 'gameOver', 'victoryScreen'].forEach(screenId => {
            document.getElementById(screenId).addEventListener('click', (e) => {
                // Don't trigger if clicking on form elements
                if (e.target.closest('form')) return;
                this.handleGameAction();
            });
        });

        // Canvas click for pause during gameplay
        this.canvas.addEventListener('click', () => {
            if (!this.waiting && !this.gameOver && !this.victory) {
                this.togglePause();
            }
        });
    }

    togglePause() {
        this.paused = !this.paused;
        const pauseScreen = document.getElementById('pauseScreen');
        if (this.paused) {
            pauseScreen.classList.remove('hidden');
        } else {
            pauseScreen.classList.add('hidden');
        }
    }

    startGame() {
        this.waiting = false;
        document.getElementById('startScreen').classList.add('hidden');
    }

    checkCollisions() {
        return this.obstacles.some(obstacle => checkCollision(this.player, obstacle));
    }

    updateScore() {
        if (this.player.hasReachedGoal()) {
            this.score++;
            document.getElementById('score').textContent = this.score;
            document.getElementById('frogsToWin').textContent = this.frogsToWin - this.player.successfulFrogs.length;
            
            if (this.player.isTopRowFull()) {
                this.victory = true;
                document.getElementById('victoryScreen').classList.remove('hidden');
            }
        }
    }

    loseLife() {
        this.collisionSound.play();
        this.lives--;
        document.getElementById('lives').textContent = this.lives;
        
        if (this.lives <= 0) {
            this.gameOver = true;
            document.getElementById('gameOver').classList.remove('hidden');
            document.getElementById('finalScore').textContent = this.score;
            // Show the score form and hide restart text initially
            document.getElementById('scoreForm').classList.remove('hidden');
            document.querySelector('.restart-text').classList.add('hidden');
            document.getElementById('playerName').focus();
            // Display current high scores
            this.displayHighScores();
        } else {
            this.player.reset();
        }
    }

    reset() {
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        this.waiting = false;
        this.paused = false;
        this.victory = false;
        this.player.reset();
        this.player.clearSuccessfulFrogs();
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('frogsToWin').textContent = this.frogsToWin;
        document.getElementById('gameOver').classList.add('hidden');
        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('pauseScreen').classList.add('hidden');
        document.getElementById('victoryScreen').classList.add('hidden');
    }

    update() {
        if (this.gameOver || this.waiting || this.paused || this.victory) return;

        this.obstacles.forEach(obstacle => obstacle.update());
        
        if (this.checkCollisions()) {
            this.loseLife();
        }
        
        this.updateScore();
    }

    draw() {
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Draw safe zones
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, GRID_SIZE);
        this.ctx.fillRect(0, CANVAS_HEIGHT - GRID_SIZE, CANVAS_WIDTH, GRID_SIZE);
        
        this.obstacles.forEach(obstacle => obstacle.draw(this.ctx));
        this.player.draw(this.ctx);
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when the page loads
window.onload = () => {
    window.game = new Game();
};
