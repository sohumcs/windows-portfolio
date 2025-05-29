
import React, { useState, useEffect, useCallback } from 'react';
import { Gamepad, Trophy, Star, Play, RotateCcw } from 'lucide-react';

export const Games = () => {
  const [selectedGame, setSelectedGame] = useState('minesweeper');
  const [score, setScore] = useState(0);

  const games = [
    { id: 'minesweeper', name: 'Minesweeper', icon: '💣', description: 'Find all mines!' },
    { id: 'solitaire', name: 'Solitaire', icon: '♠️', description: 'Classic card game' },
    { id: 'snake', name: 'Snake', icon: '🐍', description: 'Eat and grow!' },
    { id: 'tetris', name: 'Tetris', icon: '🧩', description: 'Block puzzle game' }
  ];

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      <div className="bg-blue-600 text-white p-3 border-b-2 border-gray-400 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Gamepad className="w-6 h-6" />
          <h1 className="text-lg font-bold">Windows 95 Game Center</h1>
          <div className="ml-auto flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">High Score: {score}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-56 bg-gray-200 border-r-2 border-gray-400 p-3 flex-shrink-0">
          <h2 className="font-bold text-gray-800 mb-3 text-sm">Select Game:</h2>
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className={`w-full text-left p-3 mb-2 border-2 transition-all ${
                selectedGame === game.id
                  ? 'border-blue-600 bg-blue-100'
                  : 'border-gray-600 bg-gray-300 hover:bg-gray-400'
              }`}
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xl">{game.icon}</span>
                <span className="text-sm font-bold">{game.name}</span>
              </div>
              <p className="text-xs text-gray-600">{game.description}</p>
            </button>
          ))}
          
          <div className="mt-6 p-3 bg-gray-300 border-2 border-gray-600">
            <h3 className="font-bold text-xs mb-2">Game Stats:</h3>
            <div className="text-xs space-y-1">
              <div>Games Played: 42</div>
              <div>Win Rate: 73%</div>
              <div>Time Played: 2h 15m</div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          {selectedGame === 'minesweeper' && <MinesweeperGame onScoreChange={setScore} />}
          {selectedGame === 'solitaire' && <SolitaireGame onScoreChange={setScore} />}
          {selectedGame === 'snake' && <SnakeGame onScoreChange={setScore} />}
          {selectedGame === 'tetris' && <TetrisGame onScoreChange={setScore} />}
        </div>
      </div>
    </div>
  );
};

const MinesweeperGame = ({ onScoreChange }: { onScoreChange: (score: number) => void }) => {
  const [board, setBoard] = useState<string[]>(Array(64).fill(''));
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [mineCount, setMineCount] = useState(10);
  const [revealedCells, setRevealedCells] = useState(new Set<number>());
  const [mines, setMines] = useState(new Set<number>());

  const initializeGame = useCallback(() => {
    const newMines = new Set<number>();
    while (newMines.size < 10) {
      newMines.add(Math.floor(Math.random() * 64));
    }
    setMines(newMines);
    setBoard(Array(64).fill(''));
    setRevealedCells(new Set());
    setGameState('playing');
    setMineCount(10);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCellClick = (index: number) => {
    if (gameState !== 'playing' || revealedCells.has(index)) return;
    
    const newRevealedCells = new Set(revealedCells);
    newRevealedCells.add(index);
    setRevealedCells(newRevealedCells);

    const newBoard = [...board];
    
    if (mines.has(index)) {
      newBoard[index] = '💥';
      setBoard(newBoard);
      setGameState('lost');
    } else {
      const row = Math.floor(index / 8);
      const col = index % 8;
      let adjacentMines = 0;
      
      for (let r = Math.max(0, row - 1); r <= Math.min(7, row + 1); r++) {
        for (let c = Math.max(0, col - 1); c <= Math.min(7, col + 1); c++) {
          if (mines.has(r * 8 + c)) adjacentMines++;
        }
      }
      
      newBoard[index] = adjacentMines > 0 ? adjacentMines.toString() : ' ';
      setBoard(newBoard);
      
      if (newRevealedCells.size === 64 - 10) {
        setGameState('won');
        onScoreChange(100);
      }
    }
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4 mb-4">
        <h2 className="text-xl font-bold">💣 Minesweeper</h2>
        <span className="text-sm">Mines: {mineCount}</span>
        <button
          onClick={initializeGame}
          className="px-3 py-1 bg-gray-200 border-2 border-gray-600 hover:bg-gray-300 text-sm"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="bg-gray-300 border-4 border-gray-600 inline-block p-4">
        <div className="grid grid-cols-8 gap-1 mb-4">
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => handleCellClick(i)}
              className={`w-8 h-8 border border-gray-600 hover:bg-gray-200 text-xs font-bold ${
                cell === '💥' ? 'bg-red-500' : 
                revealedCells.has(i) ? 'bg-white' : 'bg-gray-400'
              }`}
              disabled={gameState !== 'playing'}
            >
              {revealedCells.has(i) ? cell : ''}
            </button>
          ))}
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <span className={`font-bold ${
            gameState === 'won' ? 'text-green-600' : gameState === 'lost' ? 'text-red-600' : 'text-gray-800'
          }`}>
            {gameState === 'playing' ? '🙂' : gameState === 'won' ? '😎' : '😵'}
          </span>
          {gameState !== 'playing' && (
            <span className="text-sm font-bold">
              {gameState === 'won' ? 'You Won!' : 'Game Over!'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const SnakeGame = ({ onScoreChange }: { onScoreChange: (score: number) => void }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 1 });
  const [gameRunning, setGameRunning] = useState(false);
  const [gameScore, setGameScore] = useState(0);

  const moveSnake = useCallback(() => {
    if (!gameRunning) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
        setGameRunning(false);
        return prevSnake;
      }

      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameRunning(false);
        return prevSnake;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
        const newScore = gameScore + 10;
        setGameScore(newScore);
        onScoreChange(newScore);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameRunning, gameScore, onScoreChange]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 200);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
        break;
    }
  }, [direction]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 0, y: 1 });
    setGameRunning(true);
    setGameScore(0);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">🐍 Snake Game</h2>
      <div className="bg-black border-4 border-gray-600 inline-block p-4">
        <div className="w-80 h-80 bg-green-900 border border-green-500 relative mb-4">
          <div className="absolute inset-0 grid grid-cols-20">
            {Array.from({ length: 400 }, (_, index) => {
              const x = index % 20;
              const y = Math.floor(index / 20);
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isFood = food.x === x && food.y === y;
              
              return (
                <div
                  key={index}
                  className={`w-4 h-4 ${
                    isSnake ? 'bg-green-400' : 
                    isFood ? 'bg-red-500' : 
                    'bg-green-900'
                  }`}
                />
              );
            })}
          </div>
          
          {!gameRunning && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <button
                onClick={startGame}
                className="px-4 py-2 bg-green-500 text-white border-2 border-green-300 font-bold"
              >
                <Play className="w-4 h-4 inline mr-2" />
                Start Game
              </button>
            </div>
          )}
        </div>
        <div className="text-white text-sm">
          <p>Score: {gameScore}</p>
          <p className="text-xs mt-2">Use arrow keys to move</p>
        </div>
      </div>
    </div>
  );
};

const SolitaireGame = ({ onScoreChange }: { onScoreChange: (score: number) => void }) => {
  const [cards, setCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  const dealCards = () => {
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];
    
    for (let suit of suits) {
      for (let value of values) {
        deck.push(value + suit);
      }
    }
    
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    
    setCards(deck.slice(0, 28));
    setMoves(0);
    onScoreChange(50);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">♠️ Solitaire</h2>
      <div className="bg-green-600 border-4 border-gray-600 inline-block p-6 min-h-96">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              {cards.slice(i * 4, (i + 1) * 4).map((card, j) => (
                <div
                  key={j}
                  className="w-16 h-20 bg-white border-2 border-gray-800 flex items-center justify-center text-xs cursor-pointer hover:bg-gray-100"
                  onClick={() => setMoves(m => m + 1)}
                >
                  {card}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="text-white text-sm mb-4">
          <p>Moves: {moves}</p>
        </div>
        <button 
          onClick={dealCards}
          className="px-4 py-2 bg-red-500 text-white border-2 border-gray-600 hover:bg-red-400 font-bold"
        >
          Deal New Game
        </button>
      </div>
    </div>
  );
};

const TetrisGame = ({ onScoreChange }: { onScoreChange: (score: number) => void }) => {
  const [board, setBoard] = useState(Array(200).fill(0));
  const [gameScore, setGameScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);

  const addBlock = () => {
    const newBoard = [...board];
    const blockPositions = [
      Math.floor(Math.random() * 10) + 180,
      Math.floor(Math.random() * 10) + 170,
      Math.floor(Math.random() * 10) + 160,
      Math.floor(Math.random() * 10) + 150
    ];
    
    blockPositions.forEach(pos => {
      if (pos < 200) newBoard[pos] = 1;
    });
    
    setBoard(newBoard);
    const newScore = gameScore + 25;
    setGameScore(newScore);
    onScoreChange(newScore);
    setLines(prev => prev + 1);
    if (lines % 10 === 0) setLevel(prev => prev + 1);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">🧩 Tetris</h2>
      <div className="bg-black border-4 border-gray-600 inline-block p-4">
        <div className="w-64 h-80 bg-gray-900 border border-gray-500 relative mb-4 grid grid-cols-10">
          {board.map((cell, i) => (
            <div
              key={i}
              className={`w-6 h-4 border-r border-gray-700 ${
                cell ? 'bg-blue-500' : 'bg-gray-900'
              }`}
            />
          ))}
        </div>
        <div className="text-white text-sm space-y-1">
          <p>Score: {gameScore}</p>
          <p>Level: {level}</p>
          <p>Lines: {lines}</p>
          <button 
            onClick={addBlock}
            className="mt-2 px-4 py-1 bg-purple-600 hover:bg-purple-700 border border-purple-400"
          >
            Drop Block
          </button>
        </div>
      </div>
    </div>
  );
};
