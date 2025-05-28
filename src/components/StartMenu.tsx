
import React from 'react';
import { Github, FileText, Linkedin, Monitor, Sun, Moon } from 'lucide-react';

interface StartMenuProps {
  onClose: () => void;
  onThemeToggle: () => void;
  onOpenAll: () => void;
  isDark: boolean;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  onClose,
  onThemeToggle,
  onOpenAll,
  isDark
}) => {
  const menuItems = [
    { icon: <Github className="w-4 h-4" />, label: 'GitHub', action: () => window.open('https://github.com', '_blank') },
    { icon: <FileText className="w-4 h-4" />, label: 'Resume', action: () => {} },
    { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', action: () => window.open('https://linkedin.com', '_blank') },
    { icon: <Monitor className="w-4 h-4" />, label: 'Open All', action: onOpenAll },
  ];

  return (
    <div 
      className="fixed inset-0 z-40"
      onClick={onClose}
    >
      <div 
        className={`
          absolute bottom-10 left-2 w-64 rounded-lg shadow-2xl border animate-slide-in-right
          ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`
          p-4 rounded-t-lg
          ${isDark 
            ? 'bg-gradient-to-r from-gray-700 to-gray-600' 
            : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }
        `}>
          <div className="text-white font-bold">Portfolio OS</div>
          <div className="text-white/80 text-sm">Developer Edition</div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`
                w-full flex items-center gap-3 p-2 rounded hover:bg-blue-500 hover:text-white
                transition-colors text-left
                ${isDark ? 'text-gray-200' : 'text-gray-700'}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          
          <hr className={`my-2 ${isDark ? 'border-gray-600' : 'border-gray-200'}`} />
          
          <button
            onClick={onThemeToggle}
            className={`
              w-full flex items-center gap-3 p-2 rounded hover:bg-blue-500 hover:text-white
              transition-colors text-left
              ${isDark ? 'text-gray-200' : 'text-gray-700'}
            `}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{isDark ? 'Light Theme' : 'Dark Theme'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
