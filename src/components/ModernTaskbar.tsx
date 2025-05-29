
import React from 'react';
import { WindowConfig } from './Desktop';
import { Clock } from './Clock';

interface ModernTaskbarProps {
  openWindows: WindowConfig[];
  onStartClick: () => void;
  onWindowClick: (id: string) => void;
  isDark: boolean;
}

export const ModernTaskbar: React.FC<ModernTaskbarProps> = ({
  openWindows,
  onStartClick,
  onWindowClick,
  isDark
}) => {
  return (
    <div className={`
      fixed bottom-0 left-0 right-0 h-12 flex items-center px-1 border-t-2 border-gray-400
      ${isDark 
        ? 'bg-gray-600' 
        : 'bg-gray-300'
      }
    `}>
      {/* Start Button - Windows 95 style */}
      <button
        onClick={onStartClick}
        className={`
          h-10 px-4 mr-2 border-2 border-gray-600 flex items-center gap-2 
          transition-all duration-200 font-bold text-sm
          ${isDark ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'}
          hover:bg-gray-400 active:border-inset
        `}
        title="Start"
      >
        <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-yellow-300"></div>
        </div>
        Start
      </button>

      {/* Taskbar Separator */}
      <div className="w-px h-8 bg-gray-600 mr-2"></div>

      {/* Open Windows */}
      <div className="flex-1 flex gap-1 overflow-x-auto">
        {openWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`
              flex items-center gap-2 px-3 py-1 border-2 border-gray-600 text-sm max-w-48 truncate
              transition-all duration-200 h-8
              ${window.isMinimized 
                ? (isDark ? 'bg-gray-500' : 'bg-gray-200') 
                : (isDark ? 'bg-gray-400' : 'bg-white')
              } 
              ${isDark ? 'text-white' : 'text-black'}
              hover:bg-gray-400 active:border-inset
            `}
            title={window.title}
          >
            <span className="text-xs">{window.icon}</span>
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-2 ml-2 border-l-2 border-gray-600 pl-2">
        <Clock isDark={isDark} />
      </div>
    </div>
  );
};
