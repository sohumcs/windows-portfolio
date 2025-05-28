
import React from 'react';
import { Github, FileText, Linkedin, Monitor, Sun, Moon, Grid3X3, Power } from 'lucide-react';

interface ModernStartMenuProps {
  onClose: () => void;
  onThemeToggle: () => void;
  onOpenAll: () => void;
  isDark: boolean;
}

export const ModernStartMenu: React.FC<ModernStartMenuProps> = ({
  onClose,
  onThemeToggle,
  onOpenAll,
  isDark
}) => {
  const quickActions = [
    { icon: <Github className="w-5 h-5" />, label: 'GitHub', action: () => window.open('https://github.com', '_blank') },
    { icon: <FileText className="w-5 h-5" />, label: 'Resume', action: () => {} },
    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', action: () => window.open('https://linkedin.com', '_blank') },
    { icon: <Grid3X3 className="w-5 h-5" />, label: 'Open All', action: onOpenAll },
  ];

  return (
    <div 
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      <div 
        className={`
          absolute bottom-14 left-2 w-80 rounded-xl shadow-2xl border backdrop-blur-xl animate-slide-in-right
          ${isDark 
            ? 'bg-gray-900/95 border-gray-700' 
            : 'bg-white/95 border-gray-200'
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-200/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              D
            </div>
            <div>
              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Developer</h3>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Portfolio OS</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4">
          <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Quick Actions
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className={`
                  flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-200
                  hover:bg-blue-500/10 hover:scale-105
                  ${isDark ? 'text-gray-200' : 'text-gray-700'}
                `}
              >
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  {item.icon}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* System Controls */}
        <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex justify-between">
            <button
              onClick={onThemeToggle}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                hover:bg-blue-500/10
                ${isDark ? 'text-gray-200' : 'text-gray-700'}
              `}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <button
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                hover:bg-red-500/10 hover:text-red-500
                ${isDark ? 'text-gray-200' : 'text-gray-700'}
              `}
              title="Restart"
            >
              <Power className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
