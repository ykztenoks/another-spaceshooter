const shipMoves = {
  moveRight() {
    shipX += 5;
  },
  moveLeft() {
    shipX -= 5;
  },
};

if (canvas === false) {
  document.onkeydown = (event) => {
    if (event.keyCode === 37 || event.key === "a") {
      console.log("yay");
    }
    if (event.keyCode === 39 || event.key === "d") {
      console.log("wow");
    }
  };
}
