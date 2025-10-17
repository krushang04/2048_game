const GameOverModal = ({ gameStatus, score, onContinue, onRestart }) => {
  if (gameStatus === "playing") return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl animate-scaleIn">
        {gameStatus === "won" ? (
          <>
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-4xl font-black text-gray-800 mb-2">You Won!</h2>
            <p className="text-gray-600 mb-6">Congratulations! You reached 2048!</p>
            <div className="flex gap-3 justify-center">
              <button onClick={onContinue} className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all hover:scale-105 active:scale-95">
                Continue Playing
              </button>
              <button onClick={onRestart} className="px-6 py-3 bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-800 transition-all hover:scale-105 active:scale-95">
                New Game
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4 animate-bounce">😔</div>
            <h2 className="text-4xl font-black text-gray-800 mb-2">Game Over!</h2>
            <p className="text-gray-600 mb-2">No more moves available.</p>
            <p className="text-2xl font-bold text-purple-600 mb-6">Score: {score}</p>
            <button
              onClick={onRestart}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameOverModal;
