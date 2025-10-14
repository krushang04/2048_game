const Tile = ({ value, boardSize }) => {
  const getTileColor = (value) => {
    const colors = {
      0: "bg-gray-200",
      2: "bg-amber-100 text-gray-700",
      4: "bg-amber-200 text-gray-700",
      8: "bg-orange-300 text-white",
      16: "bg-orange-400 text-white",
      32: "bg-orange-500 text-white",
      64: "bg-red-400 text-white",
      128: "bg-yellow-400 text-white",
      256: "bg-yellow-500 text-white",
      512: "bg-yellow-600 text-white",
      1024: "bg-yellow-700 text-white",
      2048: "bg-yellow-800 text-white",
    };
    return colors[value] || "bg-purple-600 text-white";
  };

  const getFontSize = () => {
    if (boardSize <= 4) return "2rem";
    if (boardSize <= 6) return "1.5rem";
    return "1.25rem";
  };

  return (
    <div
      className={`rounded-xl font-black flex items-center justify-center transition-all duration-200 shadow-lg transform ${getTileColor(
        value
      )} ${value !== 0 ? "animate-tile-pop" : ""}`}
      style={{
        aspectRatio: "1",
        fontSize: getFontSize(),
        animation: value !== 0 ? "tilePop 0.2s ease-out" : "none",
      }}
    >
      {value !== 0 && value}
    </div>
  );
};

export default Tile;
