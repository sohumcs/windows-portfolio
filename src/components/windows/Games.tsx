import React, { useState, useEffect } from 'react';
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
      {/* Games Header */}
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
        {/* Game Selection Sidebar */}
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

        {/* Game Content Area */}
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

  const handleCellClick = (index: number) => {
    if (gameState !== 'playing') return;
    
    const newBoard = [...board];
    if (Math.random() < 0.1) { // 10% chance of mine
      newBoard[index] = '💥';
      setGameState('lost');
    } else {
      const adjacentMines = Math.floor(Math.random() * 4);
      newBoard[index] = adjacentMines > 0 ? adjacentMines.toString() : '';
      if (newBoard.filter(cell => cell === '').length < 10) {
        setGameState('won');
        onScoreChange(100);
      }
    }
    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(Array(64).fill(''));
    setGameState('playing');
    setMineCount(10);
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4 mb-4">
        <h2 className="text-xl font-bold">💣 Minesweeper</h2>
        <span className="text-sm">Mines: {mineCount}</span>
        <button
          onClick={resetGame}
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
                cell === '💥' ? 'bg-red-500' : cell !== '' ? 'bg-white' : 'bg-gray-400'
              }`}
              disabled={gameState !== 'playing'}
            >
              {cell}
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

const SolitaireGame = ({ onScoreChange }: { onScoreChange: (score: number) => void }) => (
  <div className="text-center">
    <h2 className="text-xl font-bold mb-4">♠️ Solitaire</h2>
    <div className="bg-green-600 border-4 border-gray-600 inline-block p-6 min-h-96">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-16 h-20 bg-blue-800 border-2 border-white flex items-center justify-center text-white text-xs cursor-pointer hover:bg-blue-700">
            ♠️
          </div>
        ))}
      </div>
      <button 
        onClick={() => onScoreChange(50)}
        className="px-4 py-2 bg-red-500 text-white border-2 border-gray-600 hover:bg-red-400 font-bold"
      >
        Deal Cards
      </button>
    </div>
  </div>
);

const SnakeGame = ({ onScoreChange }: { onScoreChange: (score: number) => void }) => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">🐍 Snake Game</h2>
      <div className="bg-black border-4 border-gray-600 inline-block p-4">
        <div className="w-80 h-80 bg-green-900 border border-green-500 relative mb-4">
          <div className="absolute top-20 left-20 w-4 h-4 bg-green-400"></div>
          <div className="absolute top-24 left-20 w-4 h-4 bg-green-300"></div>
          <div className="absolute top-28 left-20 w-4 h-4 bg-green-200"></div>
          <div className="absolute top-40 left-40 w-4 h-4 bg-red-500 rounded-full"></div>
          {!gameStarted && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <button
                onClick={() => {
                  setGameStarted(true);
                  onScoreChange(25);
                }}
                className="px-4 py-2 bg-green-500 text-white border-2 border-green-300 font-bold"
              >
                <Play className="w-4 h-4 inline mr-2" />
                Start Game
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 max-w-32 mx-auto">
          <button className="px-3 py-2 bg-gray-400 border-2 border-gray-600 hover:bg-gray-300">↑</button>
          <button className="px-3 py-2 bg-gray-400 border-2 border-gray-600 hover:bg-gray-300">↓</button>
          <button className="px-3 py-2 bg-gray-400 border-2 border-gray-600 hover:bg-gray-300">←</button>
          <button className="px-3 py-2 bg-gray-400 border-2 border-gray-600 hover:bg-gray-300">→</button>
        </div>
      </div>
    </div>
  );
};

const TetrisGame = ({ onScoreChange }: { onScoreChange: (score: number) => void }) => (
  <div className="text-center">
    <h2 className="text-xl font-bold mb-4">🧩 Tetris</h2>
    <div className="bg-black border-4 border-gray-600 inline-block p-4">
      <div className="w-64 h-80 bg-gray-900 border border-gray-500 relative mb-4">
        {/* Tetris blocks */}
        <div className="absolute bottom-0 left-0 w-full h-8 bg-blue-500"></div>
        <div className="absolute bottom-8 left-16 w-16 h-8 bg-red-500"></div>
        <div className="absolute bottom-16 left-0 w-32 h-8 bg-green-500"></div>
      </div>
      <div className="text-white text-sm space-y-1">
        <p>Score: 1250</p>
        <p>Level: 3</p>
        <p>Lines: 12</p>
        <button 
          onClick={() => onScoreChange(75)}
          className="mt-2 px-4 py-1 bg-purple-600 hover:bg-purple-700 border border-purple-400"
        >
          Play Round
        </button>
      </div>
    </div>
  </div>
);
