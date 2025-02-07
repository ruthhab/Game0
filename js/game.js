class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.player = new Player();
        this.obstacles = [];
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        
        this.initObstacles();
        this.setupEventListeners();
        this.gameLoop();
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
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            
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
    }

    checkCollisions() {
        return this.obstacles.some(obstacle => checkCollision(this.player, obstacle));
    }

    updateScore() {
        if (this.player.hasReachedGoal()) {
            this.score++;
            document.getElementById('score').textContent = this.score;
            this.player.reset();
        }
    }

    loseLife() {
        this.lives--;
        document.getElementById('lives').textContent = this.lives;
        
        if (this.lives <= 0) {
            this.gameOver = true;
            document.getElementById('gameOver').classList.remove('hidden');
            document.getElementById('finalScore').textContent = this.score;
        } else {
            this.player.reset();
        }
    }

    reset() {
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        this.player.reset();
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('gameOver').classList.add('hidden');
    }

    update() {
        if (this.gameOver) return;

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
