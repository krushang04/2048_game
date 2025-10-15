import Board from "./components/Board";

const App = () => {
  return (
    <div className="min-h-screen w-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Board />
      </div>
    </div>
  );
};

export default App;
