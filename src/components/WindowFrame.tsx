
import React, { useState, useRef, useEffect } from 'react';
import { WindowConfig } from './Desktop';
import { Minus, Square, X } from 'lucide-react';

interface WindowFrameProps {
  window: WindowConfig;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onUpdatePosition: (position: { x: number; y: number }) => void;
  isDark: boolean;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onUpdatePosition,
  isDark,
  children
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !window.isMaximized) {
        const newPosition = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        };
        onUpdatePosition(newPosition);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onUpdatePosition, window.isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  if (window.isMinimized) return null;

  const windowStyle = window.isMaximized
    ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 48px)' }
    : {
        top: window.position.y,
        left: window.position.x,
        width: Math.min(window.size.width, window.innerWidth - 40),
        height: Math.min(window.size.height, window.innerHeight - 80)
      };

  return (
    <div
      ref={windowRef}
      className={`
        fixed z-50 rounded-lg shadow-2xl border animate-scale-in backdrop-blur-sm
        ${isDark ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'}
        ${isDragging ? 'cursor-grabbing' : ''}
      `}
      style={windowStyle}
    >
      {/* Title Bar */}
      <div
        className={`
          flex items-center justify-between px-4 py-2 rounded-t-lg cursor-grab active:cursor-grabbing
          ${isDark 
            ? 'bg-gray-800/90 border-b border-gray-700' 
            : 'bg-gray-50/90 border-b border-gray-200'
          }
        `}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-3">
          <div className={`text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>{window.icon}</div>
          <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>{window.title}</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onMinimize}
            className="w-8 h-8 bg-transparent hover:bg-gray-500/20 rounded flex items-center justify-center transition-colors group"
            title="Minimize"
          >
            <Minus className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-600'} group-hover:text-white`} />
          </button>
          <button
            onClick={onMaximize}
            className="w-8 h-8 bg-transparent hover:bg-gray-500/20 rounded flex items-center justify-center transition-colors group"
            title="Maximize"
          >
            <Square className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-600'} group-hover:text-white`} />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-transparent hover:bg-red-500 rounded flex items-center justify-center transition-colors group"
            title="Close"
          >
            <X className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-600'} group-hover:text-white`} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full overflow-auto rounded-b-lg">
        {children}
      </div>
    </div>
  );
};
