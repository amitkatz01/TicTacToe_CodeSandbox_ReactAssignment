import Cell from "../Cell/Cell.js";
import React, { useState } from "react";
import "./GameBoard.css";
import CheckForWin from "../CheckForWin/CheckForWin.js";

function GameBoard(props) {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true); // Who's turn is it now - X goes first always
  const [clickedCells, setClickedCells] = useState(Array(9).fill(false));
  const [gameResult, setGameResult] = useState(false); // Store the game result
  const [winningCells, setWinningCells] = useState([]); // Saving the 3 winning cells to highlight them in the end of a game

  const handleCellClick = (index) => {
    if (clickedCells.every((element) => element === true)) {
      return;
    }
    // If cell was already clicked
    if (board[index] === "") {
      const newBoard = [...board];
      newBoard[index] = isXTurn ? "X" : "O";
      setBoard(newBoard);
      setIsXTurn(!isXTurn);
      // Toggle between players' turns

      const newClickedCells = [...clickedCells];
      newClickedCells[index] = true;
      setClickedCells(newClickedCells);
      // Adding cell to clicked cells array

      const result = CheckForWin({ board: newBoard, isXTurn });
      // Check for a win after each cell click
      if (result) {
        // If theres a win/ tie
        setGameResult(result); // Set game result
        setClickedCells(Array(9).fill(true));
        // Player will be unable to click further before resetting the game
        setWinningCells(result === "Tie" ? [] : result.winningCells); // Set winning streak cells
      }
    }
  };

  const handleDismissClick = () => {
    setGameResult(null); // Remove the game result message
  };

  const handleResetClick = () => {
    setBoard(Array(9).fill("")); // Clear the board
    setIsXTurn(true); // Set X as the starting player
    setClickedCells(Array(9).fill(false)); // Reset clickedCells
    setGameResult(null); // Clear game result
    setWinningCells([]); // Reset winningCells (to remove styling)
  };

  return (
    <div>
      <div className="game-board">
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onClick={() => handleCellClick(index)}
            className={`cell ${clickedCells[index] ? "clicked" : ""} ${
              winningCells.includes(index) ? "winning-cell" : ""
            }`}
          />
        ))}
      </div>
      <div className="reset-container">
        <button className="reset" onClick={handleResetClick}>
          Reset Game
        </button>
      </div>
      {gameResult && (
        <div>
          <div className="backdrop"></div>
          <div className="container">
            <div className="modal">
              <div className="header">
                <h2>
                  {gameResult.result === "Tie"
                    ? "It's a Tie!"
                    : `${gameResult.result} wins!`}
                  {/* Present appropriate title based on gameResult  */}
                </h2>
              </div>
              <p className="content">
                Press the reset button to start a new game!
              </p>
              <div className="actions">
                <button className="dismiss" onClick={handleDismissClick}>
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameBoard;
