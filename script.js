const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
canvas.width = canvas.height = 400;

let snake = [{x: 200, y: 200}];
let snakeDirection = {x: 0, y: 0};
let food = generateRandomFood();
let score = 0;

document.addEventListener("keydown", changeDirection);

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        alert("Game Over! Your score was: " + score);
        resetGame();
        return;
    }
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        snake.push({});
        food = generateRandomFood();
        document.getElementById("score").innerText = "Score: " + score;
    }
    clearBoard();
    drawFood();
    drawSnake();
}

function moveSnake() {
    const head = {x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y};
    snake.unshift(head);
    snake.pop();
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && snakeDirection.x === 0) { // Left arrow
        snakeDirection = {x: -gridSize, y: 0};
    } else if (keyPressed === 38 && snakeDirection.y === 0) { // Up arrow
        snakeDirection = {x: 0, y: -gridSize};
    } else if (keyPressed === 39 && snakeDirection.x === 0) { // Right arrow
        snakeDirection = {x: gridSize, y: 0};
    } else if (keyPressed === 40 && snakeDirection.y === 0) { // Down arrow
        snakeDirection = {x: 0, y: gridSize};
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function generateRandomFood() {
    const foodX = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const foodY = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    return {x: foodX, y: foodY};
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
    });
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resetGame() {
    snake = [{x: 200, y: 200}];
    snakeDirection = {x: 0, y: 0};
    food = generateRandomFood();
    score = 0;
    document.getElementById("score").innerText = "Score: " + score;
}

setInterval(gameLoop, 100);
