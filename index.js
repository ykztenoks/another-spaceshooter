const startScreen = document.querySelector(".start-screen");
const startBtn = document.querySelector(".start-btn");
const canvasBlock = document.querySelector(".canvas-block");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let gameOver = true;

const ship = new Image();
let shipX = 270;
let shipY = 700;
ship.src = "./assets/images/ship.png";

function drawShip() {
  ctx.drawImage(ship, shipX, shipY, 80, 80);
}
function startGame() {
  gameOver = !gameOver;
  console.log(gameOver);
  startScreen.style.display = "none";
  canvasBlock.style.display = "flex";
  drawShip();
}

window.onload = () => {
  startBtn.onclick = startGame;
};
