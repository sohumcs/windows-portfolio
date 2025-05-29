
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
        width: Math.min(window.size.width, globalThis.innerWidth - 40),
        height: Math.min(window.size.height, globalThis.innerHeight - 80)
      };

  return (
    <div
      ref={windowRef}
      className={`
        fixed z-50 border-2 animate-scale-in
        ${isDark ? 'bg-gray-400 border-gray-600' : 'bg-gray-300 border-gray-600'}
        ${isDragging ? 'cursor-grabbing' : ''}
      `}
      style={windowStyle}
    >
      {/* Windows 95 Title Bar */}
      <div
        className={`
          flex items-center justify-between px-2 py-1 cursor-grab active:cursor-grabbing
          ${isDark 
            ? 'bg-gradient-to-r from-blue-800 to-blue-600' 
            : 'bg-gradient-to-r from-blue-600 to-blue-400'
          }
        `}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="text-sm text-white">{window.icon}</div>
          <span className="font-bold text-sm text-white">{window.title}</span>
        </div>
        
        <div className="flex gap-1">
          <button
            onClick={onMinimize}
            className="w-6 h-6 bg-gray-300 border border-gray-600 hover:bg-gray-200 flex items-center justify-center text-xs font-bold"
            title="Minimize"
          >
            _
          </button>
          <button
            onClick={onMaximize}
            className="w-6 h-6 bg-gray-300 border border-gray-600 hover:bg-gray-200 flex items-center justify-center text-xs font-bold"
            title="Maximize"
          >
            □
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-gray-300 border border-gray-600 hover:bg-red-400 flex items-center justify-center text-xs font-bold"
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full overflow-auto border-2 border-inset border-gray-400 bg-gray-200">
        {children}
      </div>
    </div>
  );
};
