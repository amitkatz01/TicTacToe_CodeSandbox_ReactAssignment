function CheckForWin(props) {
  // props- board, isXTurn
  // CheckForWin returns an object that contains X/O/tie & Winning combination OR false for no win or tie
  // If theres a tie winning combination array will be empty
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // All possible winning combinations

  for (const combination of winningCombinations) {
    // Iterate over winningCombinations
    const [a, b, c] = combination;
    const board = props.board;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c] &&
      // Are the 3 values in the possible combination the same
      (props.isXTurn ? board[a] === "X" : board[a] === "O")
      // If Symbol in combination is the current player's symbol
    ) {
      return {
        result: props.isXTurn ? "X" : "O",
        // The symbol of the winning player ('X' or 'O').
        winningCells: combination
        // The combination array- 3 indexes in board
      };
    }
  }

  if (props.board.every((cell) => cell !== "")) {
    // Check for tie only after checking for a player's win
    return {
      result: "Tie",
      winningCells: []
    };
  }

  return false;
  // If no win/ tie- return false
}

export default CheckForWin;
