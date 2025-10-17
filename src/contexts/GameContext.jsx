import { useCallback, useMemo, useState, useEffect } from "react";
import { GameLogic } from "../utils/gameLogic";
import { GameContext } from "./GameContext";

export const GameProvider = ({ children }) => {
  const [boardSize, setBoardSize] = useState(() => {
    return parseInt(localStorage.getItem("boardSize")) || 4;
  });

  const [board, setBoard] = useState(() => GameLogic.initializeBoard(4));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem("bestScore")) || 0;
  });
  const [gameStatus, setGameStatus] = useState("playing");

  const restartGame = useCallback(
    (size = boardSize) => {
      setBoard(GameLogic.initializeBoard(size));
      setScore(0);
      setGameStatus("playing");
      setBoardSize(size);
    },
    [boardSize]
  );

  // Initialize game when component mounts or boardSize changes
  useEffect(() => {
    restartGame(boardSize);
  }, [boardSize, restartGame]);

  // Save best score to localStorage when it changes
  useEffect(() => {
    if (score > bestScore) {
      const newBestScore = score;
      setBestScore(newBestScore);

      localStorage.setItem("bestScore", String(newBestScore));
    }
  }, [score, bestScore]);

  // Save board size to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("boardSize", boardSize);
  }, [boardSize]);

  const makeMove = useCallback(
    (direction) => {
      if (gameStatus !== "playing") return { moved: false };

      const { board: newBoard, score: moveScore } = GameLogic.moveBoard(board, direction);

      if (GameLogic.isBoardEqual(board, newBoard)) {
        return { moved: false };
      }

      setBoard(newBoard);
      setScore((prevScore) => {
        const newScore = prevScore + moveScore;
        return newScore;
      });

      // Add new tile after state update
      setTimeout(() => {
        const boardWithNewTile = GameLogic.addRandomTile(newBoard);
        setBoard(boardWithNewTile);

        if (GameLogic.hasWon(boardWithNewTile) && gameStatus === "playing") {
          setGameStatus("won");
        } else if (!GameLogic.hasAvailableMoves(boardWithNewTile)) {
          setGameStatus("lost");
        }
      }, 100);

      return { moved: true };
    },
    [board, gameStatus]
  );

  const value = useMemo(
    () => ({
      board,
      boardSize,
      score,
      bestScore,
      gameStatus,
      restartGame,
      makeMove,
      setBoardSize,
    }),
    [board, boardSize, score, bestScore, gameStatus, restartGame, makeMove]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
