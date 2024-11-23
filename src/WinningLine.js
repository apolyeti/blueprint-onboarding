import { useEffect, useState } from "react";

function WinningLine({ line, gridRef }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // idk theres an issue where the css doesnt apply immediately on render
    // so we need to wait a bit before showing the line
    if (line) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [line]);

  if (!line || !gridRef.current) return null;

  const gridBounds = gridRef.current.getBoundingClientRect();
  const squareSize = gridBounds.width / 3;

  const diagonalOffset = squareSize * 0.01;

  const gridDiagonal = Math.sqrt(
    Math.pow(gridBounds.width, 2) + Math.pow(gridBounds.height, 2)
  );
  const extraExtension = gridDiagonal * 0.0;

  const lines = [
    {
      x1: 0,
      y1: squareSize / 2,
      x2: gridBounds.width,
      y2: squareSize / 2,
    }, // Top row
    {
      x1: 0,
      y1: squareSize * 1.5,
      x2: gridBounds.width,
      y2: squareSize * 1.5,
    }, // Middle row
    {
      x1: 0,
      y1: squareSize * 2.5,
      x2: gridBounds.width,
      y2: squareSize * 2.5,
    }, // Bottom row
    {
      x1: squareSize / 2,
      y1: 0,
      x2: squareSize / 2,
      y2: gridBounds.height,
    }, // Left column
    {
      x1: squareSize * 1.5,
      y1: 0,
      x2: squareSize * 1.5,
      y2: gridBounds.height,
    }, // Middle column
    {
      x1: squareSize * 2.5,
      y1: 0,
      x2: squareSize * 2.5,
      y2: gridBounds.height,
    }, // Right column
    {
      x1: -diagonalOffset - extraExtension,
      y1: -diagonalOffset - extraExtension,
      x2: gridBounds.width + diagonalOffset,
      y2: gridBounds.height + diagonalOffset,
    },
    {
      x1: gridBounds.width + diagonalOffset,
      y1: -diagonalOffset - extraExtension,
      x2: -diagonalOffset - extraExtension,
      y2: gridBounds.height + diagonalOffset,
    },
  ];

  const lineIndex = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ].findIndex((pattern) => JSON.stringify(pattern) === JSON.stringify(line));

  if (lineIndex === -1) return null;

  const { x1, y1, x2, y2 } = lines[lineIndex];

  // get line length
  const lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: gridBounds.width,
        height: gridBounds.height,
        pointerEvents: "none",
        overflow: "visible",
      }}>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth="5"
        strokeDasharray={lineLength}
        strokeDashoffset={isVisible ? "0" : lineLength}
        style={{
          transition: "stroke-dashoffset 0.5s ease-in-out",
        }}
      />
    </svg>
  );
}

export default WinningLine;
