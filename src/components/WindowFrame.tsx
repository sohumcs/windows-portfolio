
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
    ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 40px)' }
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
        fixed z-50 rounded-lg shadow-2xl border animate-scale-in
        ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}
        ${isDragging ? 'cursor-grabbing' : ''}
      `}
      style={windowStyle}
    >
      {/* Title Bar */}
      <div
        className={`
          flex items-center justify-between px-2 py-1 rounded-t-lg cursor-grab active:cursor-grabbing
          ${isDark 
            ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-b border-gray-600' 
            : 'bg-gradient-to-r from-blue-500 to-blue-600 border-b border-gray-300'
          }
        `}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="text-white text-sm">{window.icon}</div>
          <span className="text-white font-medium text-sm">{window.title}</span>
        </div>
        
        <div className="flex gap-1">
          <button
            onClick={onMinimize}
            className="w-6 h-6 bg-yellow-500 hover:bg-yellow-400 rounded-sm flex items-center justify-center transition-colors"
            title="Minimize"
          >
            <Minus className="w-3 h-3 text-black" />
          </button>
          <button
            onClick={onMaximize}
            className="w-6 h-6 bg-green-500 hover:bg-green-400 rounded-sm flex items-center justify-center transition-colors"
            title="Maximize"
          >
            <Square className="w-3 h-3 text-black" />
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-red-500 hover:bg-red-400 rounded-sm flex items-center justify-center transition-colors"
            title="Close"
          >
            <X className="w-3 h-3 text-white" />
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
