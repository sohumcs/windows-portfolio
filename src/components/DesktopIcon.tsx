
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all duration-300
        hover:bg-white/20 active:bg-white/30 backdrop-blur-md
        animate-fade-in group w-20 hover:scale-110 transform
        ${isPressed ? 'scale-95' : ''}
        ${isHovered ? 'shadow-lg shadow-black/20' : ''}
        border border-white/10
      `}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => {
        setIsPressed(false);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      style={style}
      title={title}
    >
      <div className={`
        mb-2 p-3 rounded-2xl transition-all duration-300 
        ${isDark ? 'bg-gray-800/60' : 'bg-white/60'} 
        group-hover:shadow-xl group-hover:shadow-black/30
        backdrop-blur-sm border border-white/20
        ${isHovered ? 'rotate-3 scale-105' : ''}
      `}>
        {icon}
      </div>
      <span className={`
        text-center font-semibold text-xs leading-tight
        ${isDark ? 'text-white' : 'text-white'} 
        drop-shadow-lg text-shadow-lg max-w-16 truncate
        ${isHovered ? 'scale-105' : ''}
      `}>
        {title}
      </span>
    </div>
  );
};
