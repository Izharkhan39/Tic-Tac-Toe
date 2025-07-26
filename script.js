//Module for main game board logic
const GameBoard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  //Returns the current state of the board
  const getBoard = () => board;

  //Marks board with X or O at specific index only if its empty
  const setMark = (mark, index) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };

  // Returns the mark at a specific index
  const getMark = (index) => board[index];

  //Resets the board
  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { getBoard, setMark, getMark, resetBoard };
})();

//Module for controlling game rules and checking win logic
const GameController = (function () {
  const p1 = player("Player", "X");
  const p2 = player("Bot", "O");
  let currentPlayer = p1;
  let isGameOver = false;

  const playGame = function (index) {
    if (isGameOver) {
      return;
    }

    if (GameBoard.setMark(currentPlayer.getMarker(), index)) {
      console.log(GameBoard.getBoard());
      const result = checkWinner();
      if (result !== null) {
        console.log(result);
        displayController.setWinningTitle(result);
        isGameOver = true;
      } else {
        currentPlayer = currentPlayer === p1 ? p2 : p1;
      }
    }

    if (currentPlayer === p1) {
      document.querySelector(".markBtnO").classList.remove("active");
      document.querySelector(".markBtnX").classList.add("active");
    } else {
      if (currentPlayer === p2) {
        document.querySelector(".markBtnX").classList.remove("active");
        document.querySelector(".markBtnO").classList.add("active");
      }
    }
  };

  const checkWinner = () => {
    return getWinner(p1, p2);
  };

  const getCurrentPlayer = () => currentPlayer;

  //All possible winning index combinations
  const winningCombos = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  // Checks for a winner by comparing board state to winning combinations
  const getWinner = function (p1, p2) {
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];

      const markA = GameBoard.getMark(a);
      const markB = GameBoard.getMark(b);
      const markC = GameBoard.getMark(c);

      if (markA === "") continue;

      if (markA === markB && markA === markC) {
        // Return winner's name based on marker
        if (markA === p1.getMarker()) {
          isGameOver = true;
          displayController.toggleModalActive();
          return `The Winner is ${p1.getMarker()}`;
        } else if (markA === p2.getMarker()) {
          isGameOver = true;
          displayController.toggleModalActive();
          return `The Winner is ${p2.getMarker()}`;
        }
      }
    }

    if (!GameBoard.getBoard().includes("")) {
      displayController.toggleModalActive();
      return "It's a tie";
    }

    return null;
  };

  const resetGame = () => {
    GameBoard.resetBoard();
    currentPlayer = p1;
    isGameOver = false;
  };

  return { getWinner, playGame, getCurrentPlayer, resetGame };
})();

function player(name, marker) {
  const playerName = name;
  const getMarker = () => marker;

  return { playerName, getMarker };
}

const displayController = (function () {
  const cell = document.querySelectorAll(".cell");
  const winnerDisplay = document.querySelector(".winnerTitle");
  const gameRestartBtn = document.querySelector(".restartBtn");

  cell.forEach((cell) => {
    cell.addEventListener("click", () => {
      const index = parseInt(cell.dataset.index);
      GameController.playGame(index);
      cell.textContent = GameBoard.getMark(index);
    });
  });

  gameRestartBtn.addEventListener("click", () => {
    console.log("Reset");
    GameController.resetGame();
    winnerDisplay.textContent = "";

    // Clear all cell displays
    cell.forEach((cell) => {
      cell.textContent = "";
    });
    toggleModalActive();

    document.querySelector(".markBtnO").classList.remove("active");
    document.querySelector(".markBtnX").classList.add("active");
  });

  const setWinningTitle = (winningText) => {
    return (winnerDisplay.textContent = winningText);
  };

  const toggleModalActive = () => {
    document.querySelector(".modal").classList.toggle("active");
    document.querySelector(".overlay").classList.toggle("active");
  };

  return { cell, setWinningTitle, toggleModalActive };
})();
