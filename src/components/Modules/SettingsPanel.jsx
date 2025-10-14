const SettingsPanel = ({ currentSize, onSizeChange }) => {
  return (
    <div className="mb-6 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Board Size</h3>
      <div className="flex gap-3 flex-wrap">
        {[3, 4, 5, 6, 8].map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-6 py-3 rounded-lg font-bold transition-all hover:scale-105 active:scale-95 ${
              currentSize === size
                ? "bg-purple-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-purple-100"
            }`}
          >
            {size}x{size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsPanel;
