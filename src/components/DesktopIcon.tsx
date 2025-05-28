
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

  return (
    <div
      className={`
        flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-200
        hover:bg-white/10 active:bg-white/20 backdrop-blur-sm
        animate-fade-in group max-w-[100px] mx-auto
        ${isPressed ? 'scale-95' : 'hover:scale-105'}
      `}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={style}
      title={title}
    >
      <div className={`
        mb-2 p-3 rounded-xl transition-all duration-200 
        ${isDark ? 'text-white' : 'text-white'} 
        group-hover:shadow-lg group-hover:shadow-white/20
        bg-white/10 backdrop-blur-sm
      `}>
        {icon}
      </div>
      <span className={`
        text-center font-medium text-sm leading-tight
        ${isDark ? 'text-white' : 'text-white'} 
        drop-shadow-lg
      `}>
        {title}
      </span>
    </div>
  );
};
