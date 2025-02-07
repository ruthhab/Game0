class Player {
    constructor() {
        this.reset();
        this.width = FROG_SIZE;
        this.height = FROG_SIZE;
    }

    reset() {
        this.x = CANVAS_WIDTH / 2 - FROG_SIZE / 2;
        this.y = CANVAS_HEIGHT - GRID_SIZE;
    }

    move(direction) {
        switch(direction) {
            case 'up':
                this.y = clamp(this.y - GRID_SIZE, 0, CANVAS_HEIGHT - GRID_SIZE);
                break;
            case 'down':
                this.y = clamp(this.y + GRID_SIZE, 0, CANVAS_HEIGHT - GRID_SIZE);
                break;
            case 'left':
                this.x = clamp(this.x - GRID_SIZE, 0, CANVAS_WIDTH - GRID_SIZE);
                break;
            case 'right':
                this.x = clamp(this.x + GRID_SIZE, 0, CANVAS_WIDTH - GRID_SIZE);
                break;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#0f0';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    hasReachedGoal() {
        return this.y <= 0;
    }
}
