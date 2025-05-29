
import React, { useState } from 'react';
import { Gamepad, Trophy, Star, Play } from 'lucide-react';

export const Games = () => {
  const [selectedGame, setSelectedGame] = useState('minesweeper');
  const [score, setScore] = useState(0);

  const games = [
    { id: 'minesweeper', name: 'Minesweeper', icon: '💣' },
    { id: 'solitaire', name: 'Solitaire', icon: '♠️' },
    { id: 'snake', name: 'Snake', icon: '🐍' },
    { id: 'tetris', name: 'Tetris', icon: '🧩' }
  ];

  return (
    <div className="h-full bg-gray-100">
      {/* Games Header */}
      <div className="bg-blue-600 text-white p-3 border-b-2 border-gray-400">
        <div className="flex items-center gap-3">
          <Gamepad className="w-6 h-6" />
          <h1 className="text-lg font-bold">Windows 95 Games</h1>
          <div className="ml-auto flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Score: {score}</span>
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {/* Game Selection Sidebar */}
        <div className="w-48 bg-gray-200 border-r-2 border-gray-400 p-3">
          <h2 className="font-bold text-gray-800 mb-3 text-sm">Available Games</h2>
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className={`w-full text-left p-2 mb-2 border-2 transition-all ${
                selectedGame === game.id
                  ? 'border-blue-600 bg-blue-100'
                  : 'border-gray-600 bg-gray-300 hover:bg-gray-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{game.icon}</span>
                <span className="text-sm font-medium">{game.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Game Content Area */}
        <div className="flex-1 p-4">
          {selectedGame === 'minesweeper' && <MinesweeperGame />}
          {selectedGame === 'solitaire' && <SolitaireGame />}
          {selectedGame === 'snake' && <SnakeGame />}
          {selectedGame === 'tetris' && <TetrisGame />}
        </div>
      </div>
    </div>
  );
};

const MinesweeperGame = () => (
  <div className="text-center">
    <h2 className="text-xl font-bold mb-4">💣 Minesweeper</h2>
    <div className="bg-gray-300 border-4 border-gray-600 inline-block p-4 rounded">
      <div className="grid grid-cols-8 gap-1 mb-4">
        {Array.from({ length: 64 }).map((_, i) => (
          <button
            key={i}
            className="w-6 h-6 bg-gray-400 border border-gray-600 hover:bg-gray-300 text-xs font-bold"
          >
            ?
          </button>
        ))}
      </div>
      <button className="px-4 py-2 bg-yellow-400 border-2 border-gray-600 hover:bg-yellow-300 font-bold">
        🙂 New Game
      </button>
    </div>
  </div>
);

const SolitaireGame = () => (
  <div className="text-center">
    <h2 className="text-xl font-bold mb-4">♠️ Solitaire</h2>
    <div className="bg-green-600 border-4 border-gray-600 inline-block p-6 rounded min-h-96">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-16 h-20 bg-blue-800 border-2 border-white rounded flex items-center justify-center text-white text-xs">
            ♠️
          </div>
        ))}
      </div>
      <button className="px-4 py-2 bg-red-500 text-white border-2 border-gray-600 hover:bg-red-400 font-bold">
        Deal Cards
      </button>
    </div>
  </div>
);

const SnakeGame = () => (
  <div className="text-center">
    <h2 className="text-xl font-bold mb-4">🐍 Snake Game</h2>
    <div className="bg-black border-4 border-gray-600 inline-block p-4 rounded">
      <div className="w-80 h-80 bg-green-900 border border-green-500 relative mb-4">
        <div className="absolute top-20 left-20 w-4 h-4 bg-green-400"></div>
        <div className="absolute top-24 left-20 w-4 h-4 bg-green-300"></div>
        <div className="absolute top-28 left-20 w-4 h-4 bg-green-200"></div>
        <div className="absolute top-40 left-40 w-4 h-4 bg-red-500 rounded-full"></div>
      </div>
      <div className="flex gap-2 justify-center">
        <button className="px-3 py-2 bg-gray-400 border-2 border-gray-600 hover:bg-gray-300">↑</button>
        <button className="px-3 py-2 bg-gray-400 border-2 border-gray-600 hover:bg-gray-300">↓</button>
        <button className="px-3 py-2 bg-gray-400 border-2 border-gray-600 hover:bg-gray-300">←</button>
        <button className="px-3 py-2 bg-gray-400 border-2 border-gray-600 hover:bg-gray-300">→</button>
      </div>
    </div>
  </div>
);

const TetrisGame = () => (
  <div className="text-center">
    <h2 className="text-xl font-bold mb-4">🧩 Tetris</h2>
    <div className="bg-black border-4 border-gray-600 inline-block p-4 rounded">
      <div className="w-64 h-80 bg-gray-900 border border-gray-500 relative mb-4">
        {/* Tetris blocks */}
        <div className="absolute bottom-0 left-0 w-full h-8 bg-blue-500"></div>
        <div className="absolute bottom-8 left-16 w-16 h-8 bg-red-500"></div>
        <div className="absolute bottom-16 left-0 w-32 h-8 bg-green-500"></div>
      </div>
      <div className="text-white text-sm">
        <p>Score: 1250</p>
        <p>Level: 3</p>
        <p>Lines: 12</p>
      </div>
    </div>
  </div>
);
