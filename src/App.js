import "./styles.css";
import GameBoard from "./Components/GameBoard/GameBoard";

export default function App() {
  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="game-board-container">
        <GameBoard />
      </div>
    </div>
  );
}
