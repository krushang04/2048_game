export const GameLogic = {
    createEmptyBoard: (size) => Array(size).fill(null).map(() => Array(size).fill(0)),
  
    addRandomTile: (board) => {
      const emptyPositions = [];
      board.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell === 0) emptyPositions.push({ i, j });
        });
      });
      
      if (emptyPositions.length === 0) return board;
      
      const { i, j } = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
      const value = Math.random() < 0.9 ? 2 : 4;
      const newBoard = board.map(row => [...row]);
      newBoard[i][j] = value;
      return newBoard;
    },
  
    initializeBoard: (size) => {
      let board = GameLogic.createEmptyBoard(size);
      board = GameLogic.addRandomTile(board);
      board = GameLogic.addRandomTile(board);
      return board;
    },
  
    slideRow: (row) => {
      const filtered = row.filter(cell => cell !== 0);
      const merged = [];
      let score = 0;
      let i = 0;
      
      while (i < filtered.length) {
        if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
          const mergedValue = filtered[i] * 2;
          merged.push(mergedValue);
          score += mergedValue;
          i += 2;
        } else {
          merged.push(filtered[i]);
          i += 1;
        }
      }
      
      while (merged.length < row.length) {
        merged.push(0);
      }
      
      return { row: merged, score };
    },
  
    moveLeft: (board) => {
      let totalScore = 0;
      const newBoard = board.map(row => {
        const { row: newRow, score } = GameLogic.slideRow(row);
        totalScore += score;
        return newRow;
      });
      return { board: newBoard, score: totalScore };
    },
  
    rotateBoard: (board) => {
      // const size = board.length;
      return board[0].map((_, colIndex) => 
        board.map(row => row[colIndex]).reverse()
      );
    },
  
    moveBoard: (board, direction) => {
      let tempBoard = board.map(row => [...row]);
      
      if (direction === 'left') {
        const { board: movedBoard, score } = GameLogic.moveLeft(tempBoard);
        return { board: movedBoard, score };
      } else if (direction === 'right') {
        tempBoard = tempBoard.map(row => [...row].reverse());
        const { board: movedBoard, score } = GameLogic.moveLeft(tempBoard);
        return { board: movedBoard.map(row => [...row].reverse()), score };
      } else if (direction === 'up') {
        for (let i = 0; i < 3; i++) {
          tempBoard = GameLogic.rotateBoard(tempBoard);
        }
        const { board: movedBoard, score } = GameLogic.moveLeft(tempBoard);
        tempBoard = GameLogic.rotateBoard(movedBoard);
        return { board: tempBoard, score };
      } else if (direction === 'down') {
        tempBoard = GameLogic.rotateBoard(tempBoard);
        const { board: movedBoard, score } = GameLogic.moveLeft(tempBoard);
        tempBoard = movedBoard;
        for (let i = 0; i < 3; i++) {
          tempBoard = GameLogic.rotateBoard(tempBoard);
        }
        return { board: tempBoard, score };
      }
      
      return { board: tempBoard, score: 0 };
    },
  
    isBoardEqual: (board1, board2) => {
      return board1.every((row, i) => 
        row.every((cell, j) => cell === board2[i][j])
      );
    },
  
    hasAvailableMoves: (board) => {
      const size = board.length;
      
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (board[i][j] === 0) return true;
          if (j < size - 1 && board[i][j] === board[i][j + 1]) return true;
          if (i < size - 1 && board[i][j] === board[i + 1][j]) return true;
        }
      }
      return false;
    },
  
    hasWon: (board) => {
      return board.some(row => row.some(cell => cell === 2048));
    }
  };