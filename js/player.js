class Player {
    constructor() {
        this.reset();
        this.width = FROG_SIZE;
        this.height = FROG_SIZE;
        this.successfulFrogs = [];
        this.maxFrogs = Math.floor(CANVAS_WIDTH / GRID_SIZE);
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
        // Draw successful frogs
        this.successfulFrogs.forEach(frog => {
            ctx.fillStyle = '#0f0';
            ctx.fillRect(frog.x, frog.y, this.width, this.height);
        });

        // Draw current frog
        ctx.fillStyle = '#0f0';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    hasReachedGoal() {
        if (this.y <= 0) {
            // Check if there's already a frog at this x position
            const existingFrog = this.successfulFrogs.find(frog => 
                Math.abs(frog.x - this.x) < GRID_SIZE/2
            );
            
            if (!existingFrog) {
                this.successfulFrogs.push({x: this.x, y: 0});
                this.reset();
                return true;
            }
            // If there's already a frog here, move back one space
            this.y += GRID_SIZE;
        }
        return false;
    }

    isTopRowFull() {
        return this.successfulFrogs.length >= this.maxFrogs;
    }

    clearSuccessfulFrogs() {
        this.successfulFrogs = [];
    }
}
