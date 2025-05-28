
import React from 'react';
import { WindowConfig } from './Desktop';
import { Clock } from './Clock';
import { Search, Wifi, Volume2, Battery } from 'lucide-react';

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
      fixed bottom-0 left-0 right-0 h-12 flex items-center justify-between px-2 
      backdrop-blur-xl border-t z-40
      ${isDark 
        ? 'bg-gray-900/80 border-gray-700/50' 
        : 'bg-white/80 border-gray-200/50'
      }
    `}>
      {/* Left Section - Start Button + Search */}
      <div className="flex items-center gap-2">
        <button
          onClick={onStartClick}
          className={`
            w-10 h-10 rounded-md flex items-center justify-center transition-all duration-200
            hover:bg-white/10 active:bg-white/20
            ${isDark ? 'text-white' : 'text-gray-800'}
          `}
          title="Start"
        >
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
        </button>
        
        <button className={`
          flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200
          hover:bg-white/10 ${isDark ? 'text-gray-300' : 'text-gray-600'}
        `}>
          <Search className="w-4 h-4" />
          <span className="text-sm hidden sm:block">Search</span>
        </button>
      </div>

      {/* Center Section - Open Windows */}
      <div className="flex-1 flex justify-center">
        <div className="flex gap-1">
          {openWindows.map((window) => (
            <button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md text-sm max-w-48 truncate transition-all duration-200
                ${window.isMinimized 
                  ? 'bg-white/10' 
                  : 'bg-blue-500/80 shadow-lg'
                } hover:bg-white/20
                ${isDark ? 'text-white' : 'text-white'}
              `}
              title={window.title}
            >
              <span className="text-xs">{window.icon}</span>
              <span className="truncate hidden sm:block">{window.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Section - System Tray */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2">
          <Wifi className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-700'}`} />
          <Volume2 className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-700'}`} />
          <Battery className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-700'}`} />
        </div>
        <Clock isDark={isDark} />
      </div>
    </div>
  );
};
