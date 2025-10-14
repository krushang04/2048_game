import { Trophy, RotateCcw } from "lucide-react";

const ScoreBoard = ({ score, bestScore, onRestart }) => {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
        <div className="text-sm font-semibold opacity-90">SCORE</div>
        <div className="text-3xl font-black">{score}</div>
      </div>
      <div className="flex-1 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
        <div className="text-sm font-semibold opacity-90 flex items-center gap-1">
          <Trophy className="w-4 h-4" />
          BEST
        </div>
        <div className="text-3xl font-black">{bestScore}</div>
      </div>
      <button
        onClick={onRestart}
        className="bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-xl p-4 hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        title="New Game"
      >
        <RotateCcw className="w-8 h-8" />
      </button>
    </div>
  );
};

export default ScoreBoard;
