import Tile from "./Tile";

const GameBoard = ({ board, boardSize }) => {
    return (
      <div 
        className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-4 shadow-2xl mb-6"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
          gap: '12px'
        }}
      >
        {board.map((row, i) => 
          row.map((cell, j) => (
            <Tile key={`${i}-${j}`} value={cell} boardSize={boardSize} />
          ))
        )}
      </div>
    );
  };

export default GameBoard;