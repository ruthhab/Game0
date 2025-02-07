class Obstacle {
    constructor(x, y, width, speed, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = GRID_SIZE - 4;
        this.speed = speed;
        this.color = color;
    }

    update() {
        this.x += this.speed;
        
        if (this.speed > 0 && this.x > CANVAS_WIDTH) {
            this.x = -this.width;
        } else if (this.speed < 0 && this.x + this.width < 0) {
            this.x = CANVAS_WIDTH;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
