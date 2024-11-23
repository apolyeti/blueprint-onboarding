import "./App.css";
import Square from "./Square";
import { useState, useRef } from "react";
import WinningLine from "./WinningLine";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningLine, setWinningLine] = useState(null);
  const [xIsNext, setXIsNext] = useState(true);
  const gridRef = useRef(null);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const winningLine = calculateWinner(nextSquares);
    if (winningLine) {
      setWinningLine(winningLine.line);
    }
  }
  return (
    <div className="h-screen v-stack justify-center items-center">
      <h1>TIC-TAC-TOE</h1>
      <div ref={gridRef} className="grid-container v-stack">
        <WinningLine key={winningLine} line={winningLine} gridRef={gridRef} />
        <div className="h-stack">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="h-stack">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="h-stack">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      {winningLine && <h1>{xIsNext ? "O" : "X"} wins</h1>}
    </div>
  );
}

export default App;
