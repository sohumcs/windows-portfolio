
import React, { useState } from 'react';

interface DesktopIconProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
  isDark: boolean;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ title, icon, onClick, style, isDark }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`
        flex flex-col items-center p-2 cursor-pointer transition-all duration-200
        w-20 h-20 hover:bg-blue-600/30 rounded
        ${isSelected ? 'bg-blue-600/50' : ''}
        ${isPressed ? 'scale-95' : 'hover:scale-105'}
        animate-fade-in group
      `}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onDoubleClick={() => setIsSelected(!isSelected)}
      style={style}
      title={title}
    >
      {/* Icon Container - Windows 95 style */}
      <div className={`
        mb-1 p-2 transition-all duration-200 
        ${isPressed ? 'transform translate-x-0.5 translate-y-0.5' : ''}
      `}>
        {icon}
      </div>
      
      {/* Icon Label */}
      <span className={`
        text-center font-bold text-xs leading-tight
        ${isDark ? 'text-white' : 'text-white'} 
        drop-shadow-lg max-w-16 truncate
        ${isSelected ? 'bg-blue-600 px-1' : ''}
      `}>
        {title}
      </span>
    </div>
  );
};
