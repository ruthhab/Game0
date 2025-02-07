const GRID_SIZE = 40;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const FROG_SIZE = 38;

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function getRandomSpeed() {
    return (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
