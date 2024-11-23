export default function Square({ value, onSquareClick }) {
  return (
    <div className="square">
      <button className="btn" onClick={onSquareClick}>
        <p className="font-sizes">{value}</p>
      </button>
    </div>
  );
}
