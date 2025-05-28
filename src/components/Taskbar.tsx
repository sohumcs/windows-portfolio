
import React from 'react';
import { WindowConfig } from './Desktop';
import { Clock } from './Clock';

interface TaskbarProps {
  openWindows: WindowConfig[];
  onStartClick: () => void;
  onWindowClick: (id: string) => void;
  isDark: boolean;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  onStartClick,
  onWindowClick,
  isDark
}) => {
  return (
    <div className={`
      fixed bottom-0 left-0 right-0 h-10 flex items-center px-2 border-t
      ${isDark 
        ? 'bg-gray-800 border-gray-600' 
        : 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500'
      }
    `}>
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className={`
          px-4 py-1 rounded text-white font-bold text-sm hover:bg-white/20 transition-colors
          ${isDark ? 'hover:bg-gray-700' : ''}
        `}
      >
        ⊞ Start
      </button>

      {/* Window Buttons */}
      <div className="flex-1 flex gap-1 mx-2">
        {openWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`
              flex items-center gap-2 px-3 py-1 rounded text-white text-sm max-w-48 truncate
              ${window.isMinimized 
                ? 'bg-white/20' 
                : 'bg-white/30 border border-white/40'
              } hover:bg-white/40 transition-colors
            `}
            title={window.title}
          >
            <span className="text-xs">{window.icon}</span>
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-2">
        <Clock isDark={isDark} />
      </div>
    </div>
  );
};
