
import React, { useState, useEffect } from 'react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('Starting Portfolio OS...');

  useEffect(() => {
    const messages = [
      'Starting Portfolio OS...',
      'Loading developer profile...',
      'Initializing creative modules...',
      'Welcome to my digital workspace!'
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.5;
        const messageIndex = Math.floor(newProgress / 25);
        if (messageIndex < messages.length) {
          setCurrentText(messages[messageIndex]);
        }
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 flex flex-col items-center justify-center text-white">
      <div className="text-center mb-12">
        <div className="w-20 h-20 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-sm"></div>
          </div>
        </div>
        <h1 className="text-5xl font-light mb-3">Portfolio OS</h1>
        <p className="text-xl opacity-80">Developer Edition</p>
      </div>
      
      {/* Modern loading bar */}
      <div className="w-96 bg-white/10 rounded-full h-2 mb-6 backdrop-blur-sm">
        <div 
          className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300 ease-out shadow-lg"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-lg opacity-75 mb-4">{currentText}</p>
      
      {/* Loading dots animation */}
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-75"></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-150"></div>
      </div>
      
      <div className="absolute bottom-8 text-sm opacity-60">
        <p>© 2024 Portfolio OS - Modern Developer Experience</p>
      </div>
    </div>
  );
};
