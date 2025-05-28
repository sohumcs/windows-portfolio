
import React, { useState, useEffect } from 'react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('Starting Windows...');

  useEffect(() => {
    const messages = [
      'Starting Windows...',
      'Loading system files...',
      'Initializing portfolio...',
      'Welcome!'
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        const messageIndex = Math.floor(newProgress / 25);
        if (messageIndex < messages.length) {
          setCurrentText(messages[messageIndex]);
        }
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center text-white">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-600 rounded"></div>
        </div>
        <h1 className="text-4xl font-bold mb-2">Windows Portfolio</h1>
        <p className="text-xl opacity-90">Developer Edition</p>
      </div>
      
      <div className="w-80 bg-gray-200 rounded-full h-4 mb-4">
        <div 
          className="bg-green-500 h-4 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-lg opacity-75">{currentText}</p>
      
      <div className="absolute bottom-8 text-sm opacity-60">
        <p>© 2024 Portfolio OS - All rights reserved</p>
      </div>
    </div>
  );
};
