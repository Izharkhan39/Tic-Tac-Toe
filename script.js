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
  const getWinner = function () {
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];

      const markA = GameBoard.getMark(a);
      const markB = GameBoard.getMark(b);
      const markC = GameBoard.getMark(c);

      if (markA === "") continue;

      if (markA === markB && markA === markC) {
        // Return winner's name based on marker
        if (markA === izhar.getMarker()) {
          return `${izhar.playerName} wins`;
        } else if (markA === bot.getMarker()) {
          return `${bot.playerName} wins`;
        }
      }
    }
    return null;
  };

  return { getWinner };
})();

function player(name, marker) {
  const playerName = name;
  const getMarker = () => marker;

  return { playerName, getMarker };
}

const izhar = player("Izhar", "X");
const bot = player("Bot", "O");

// const playGame = (function () {})();
