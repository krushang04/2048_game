import { useState, useEffect, useCallback } from "react";
import { Gamepad2, Settings } from "lucide-react";
import { GameLogic } from "../utils/gameLogic";
import GameBoard from "./Modules/GameBoard";
import ScoreBoard from "./Modules/ScoreDisplay";
import GameOverModal from "./Modules/GameOver";
import SettingsPanel from "./Modules/SettingsPanel";

const Board = () => {
  const [boardSize, setBoardSize] = useState(4);
  const [board, setBoard] = useState(() => GameLogic.initializeBoard(4));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [showSettings, setShowSettings] = useState(false);

  const restartGame = useCallback(
    (size = boardSize) => {
      setBoard(GameLogic.initializeBoard(size));
      setScore(0);
      setGameStatus("playing");
      setBoardSize(size);
      setShowSettings(false);
    },
    [boardSize]
  );

  const makeMove = useCallback(
    (direction) => {
      if (gameStatus !== "playing") return;

      const { board: newBoard, score: moveScore } = GameLogic.moveBoard(
        board,
        direction
      );

      if (GameLogic.isBoardEqual(board, newBoard)) return;

      setTimeout(() => {
        const boardWithNewTile = GameLogic.addRandomTile(newBoard);
        setBoard(boardWithNewTile);

        const newScore = score + moveScore;
        setScore(newScore);

        if (newScore > bestScore) {
          setBestScore(newScore);
        }

        if (GameLogic.hasWon(boardWithNewTile) && gameStatus === "playing") {
          setGameStatus("won");
        } else if (!GameLogic.hasAvailableMoves(boardWithNewTile)) {
          setGameStatus("lost");
        }
      }, 150);
    },
    [board, score, bestScore, gameStatus]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showSettings) return;

      const keyMap = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        makeMove(keyMap[e.key]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [makeMove, showSettings]);

  const continueGame = () => {
    setGameStatus("playing");
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 w-board-width">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-10 h-10 text-purple-600" />
            <h1 className="text-5xl font-black text-gray-800">2048</h1>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 font-semibold flex items-center gap-2"
          >
            <Settings className="w-5 h-5" />
            {showSettings ? "Close" : "Settings"}
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel currentSize={boardSize} onSizeChange={restartGame} />
        )}

        {/* Score Board */}
        <ScoreBoard
          score={score}
          bestScore={bestScore}
          onRestart={() => restartGame()}
        />

        {/* Game Board */}
        <GameBoard board={board} boardSize={boardSize} />

        {/* Game Over Modal */}
        <GameOverModal
          gameStatus={gameStatus}
          score={score}
          onContinue={continueGame}
          onRestart={() => restartGame()}
        />

        {/* Instructions */}
        <div className="text-center text-gray-600 text-sm">
          <p className="font-semibold mb-1">Use arrow keys to move tiles</p>
          <p>Combine tiles with the same number to reach 2048!</p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes tilePop {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Board;
