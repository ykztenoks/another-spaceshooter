const startScreen = document.querySelector(".start-screen");
const startBtn = document.querySelector(".start-btn");
const canvasBlock = document.querySelector(".canvas-block");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let isShooting = true;
let gameOver = true;

const ship = new Image();
let shipX = 270;
let shipY = 700;
ship.src = "./assets/images/ship.png";

let frames = [
  //frame position based on the image containing 30 sprites
  { x: 0, y: 0, width: 32, height: 32 },
  { x: 32, y: 0, width: 32, height: 32 },
  { x: 64, y: 0, width: 32, height: 32 },
  { x: 96, y: 0, width: 32, height: 32 },
  { x: 128, y: 0, width: 32, height: 32 },
  { x: 160, y: 0, width: 32, height: 32 },
  { x: 0, y: 32, width: 32, height: 32 },
  { x: 32, y: 32, width: 32, height: 32 },
  { x: 64, y: 32, width: 32, height: 32 },
  { x: 96, y: 32, width: 32, height: 32 },
  { x: 128, y: 32, width: 32, height: 32 },
  { x: 160, y: 32, width: 32, height: 32 },
  { x: 0, y: 64, width: 32, height: 32 },
  { x: 32, y: 64, width: 32, height: 32 },
  { x: 64, y: 64, width: 32, height: 32 },
  { x: 96, y: 64, width: 32, height: 32 },
  { x: 128, y: 64, width: 32, height: 32 },
  { x: 160, y: 64, width: 32, height: 32 },
  { x: 0, y: 96, width: 32, height: 32 },
  { x: 32, y: 96, width: 32, height: 32 },
  { x: 64, y: 96, width: 32, height: 32 },
  { x: 96, y: 96, width: 32, height: 32 },
  { x: 128, y: 96, width: 32, height: 32 },
  { x: 160, y: 96, width: 32, height: 32 },
  { x: 0, y: 128, width: 32, height: 32 },
  { x: 32, y: 128, width: 32, height: 32 },
  { x: 64, y: 128, width: 32, height: 32 },
  { x: 96, y: 128, width: 32, height: 32 },
  { x: 128, y: 128, width: 32, height: 32 },
  { x: 160, y: 128, width: 32, height: 32 },
];

const projectileImg = new Image();
projectileImg.src = "./assets/sprites/projectilesprite.png";

const shipMoves = {
  moveRight() {
    shipX += 15;
  },
  moveLeft() {
    shipX -= 15;
  },
};

const projectiles = [];

function drawShip() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(ship, shipX, shipY, 80, 80);
  projectiles.forEach((current) => {
    ctx.drawImage(
      projectileImg,
      frames[current.frame].x, // x position of the frame in the sprite sheet
      frames[current.frame].y, // y position of the frame in the sprite sheet
      current.width, // width of the frame
      current.height, // height of the frame
      current.x,
      current.y,
      current.frameWidth, // width of the sprite
      current.frameHeight // height of the sprite
    );
  });
}
function handleMovement(event) {
  if (event.key === "ArrowLeft" || event.key === "a") {
    if (shipX > 0) {
      shipMoves.moveLeft();
    }
  }
  if (event.key === "ArrowRight" || event.key === "d") {
    if (shipX < canvas.width - 80) {
      shipMoves.moveRight();
    }
  }
}

function handleShooting(event) {
  if (isShooting) {
    isShooting = false;
    if (event.key === " ") {
      let projectile = {
        x: shipX,
        y: shipY,
        dx: 5,
        dy: 0,
        frame: 0,
        width: 32,
        height: 32,
        frameWidth: 64,
        frameHeight: 64,
      };
      projectiles.push(projectile);
    }
  }
  // isShooting = false;
  setInterval(() => {
    isShooting = true;
  }, 500);
}
function startGame() {
  gameOver = !gameOver;
  startScreen.style.display = "none";
  canvasBlock.style.display = "flex";

  document.addEventListener("keydown", handleMovement);
  document.addEventListener("keypress", handleShooting);
  document.addEventListener("keyup", handleMovement);
  // document.addEventListener("keyup", handleShooting);
}

function animate() {
  drawShip();
  projectiles.forEach((current) => {
    current.y -= 1;
    current.frame = (current.frame + 1) % frames.length;
    if (current.y < -150) {
      projectiles.splice(projectiles.indexOf(current), 1);
    }
  });
  requestAnimationFrame(animate);
}
animate();
window.onload = () => {
  startBtn.onclick = startGame;
};
