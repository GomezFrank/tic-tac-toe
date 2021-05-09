const status = document.querySelector(".status");
const reset = document.querySelector(".reset");
const cells = document.querySelectorAll(".game-cell");

const xSymbol = "X";
const oSymbol = "O";
let gameIsLive = true;
let xIsNext = true;

const letterToSymbol = (letter) => (letter === "x" ? xSymbol : oSymbol);

const handleWinner = (letter) => {
  gameIsLive = false;
  if (letter === "x") {
    status.innerHTML = `${letterToSymbol(letter)} has won!`;
  } else {
    status.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
  }
};

const checkGameStatus = () => {
  const topLeft = cells[0].classList[1];
  const topMiddle = cells[1].classList[1];
  const topRight = cells[2].classList[1];
  const middleLeft = cells[3].classList[1];
  const middleMiddle = cells[4].classList[1];
  const middleRight = cells[5].classList[1];
  const bottomLeft = cells[6].classList[1];
  const bottomMiddle = cells[7].classList[1];
  const bottomRigth = cells[8].classList[1];

  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWinner(topLeft);
    cells[0].classList.add('won')
    cells[1].classList.add('won')
    cells[2].classList.add('won')
  } else if (
    middleLeft &&
    middleLeft === middleMiddle &&
    middleLeft === middleRight
  ) {
    handleWinner(middleLeft);
    cells[3].classList.add('won')
    cells[4].classList.add('won')
    cells[5].classList.add('won')
  } else if (
    bottomLeft &&
    bottomLeft === bottomMiddle &&
    bottomLeft === bottomRigth
  ) {
    handleWinner(bottomLeft);
    cells[6].classList.add('won')
    cells[7].classList.add('won')
    cells[8].classList.add('won')
  } else if (topLeft && topLeft === middleLeft && topLeft && bottomLeft) {
    handleWinner(topLeft);
    cells[0].classList.add('won')
    cells[3].classList.add('won')
    cells[6].classList.add('won')
  } else if (
    topMiddle &&
    topMiddle === middleMiddle &&
    topMiddle === bottomMiddle
  ) {
    handleWinner(topMiddle);
    cells[1].classList.add('won')
    cells[4].classList.add('won')
    cells[7].classList.add('won')
  } else if (topRight && topRight === middleRight && topRight === bottomRigth) {
    handleWinner(topRight);
    cells[2].classList.add('won')
    cells[5].classList.add('won')
    cells[8].classList.add('won')
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRigth) {
    handleWinner(topLeft);
    cells[0].classList.add('won')
    cells[4].classList.add('won')
    cells[8].classList.add('won')
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWinner(topRight);
    cells[2].classList.add('won')
    cells[4].classList.add('won')
    cells[6].classList.add('won')
  } else if (
    topLeft &&
    topMiddle &&
    topRight &&
    middleLeft &&
    middleMiddle &&
    middleRight &&
    bottomLeft &&
    bottomMiddle &&
    bottomRigth
  ) {
    gameIsLive = false;
    status.innerHTML = `Game is tied!`;
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
      status.innerHTML = `${xSymbol} is next`;
    } else {
      status.innerHTML = `<span>${oSymbol} is next</span>`;
    }
  }
};

const handleReset = () => {
  xIsNext = true
  status.innerHTML = `${xSymbol} is next`;
  cells.forEach(cell => {
      cell.classList.remove('x')
      cell.classList.remove('o')
      cell.classList.remove('won')
  })
  gameIsLive = true
};

const handleCellClick = (e) => {
  const classList = e.target.classList;
  if (!gameIsLive || classList[1] === "x" || classList[1] === "o") return;
  if (xIsNext) {
    classList.add("x");
    checkGameStatus();
  } else {
    classList.add("o");
    checkGameStatus();
  }
};
reset.addEventListener("click", handleReset);

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});
