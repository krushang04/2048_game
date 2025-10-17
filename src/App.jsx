import { GameProvider } from './contexts/GameContext.jsx';
import Board from "./components/Board";

export const App = () => {
  return (
    <GameProvider>
      <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md" id="game-container">
          <Board />
        </div>
      </div>
    </GameProvider>
  );
};

export default App;
