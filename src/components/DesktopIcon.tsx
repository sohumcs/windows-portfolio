
import React, { useState } from 'react';

interface DesktopIconProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ title, icon, onClick, style }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      className={`
        flex flex-col items-center p-2 rounded cursor-pointer
        hover:bg-white/20 active:bg-white/30 transition-all duration-200
        animate-fade-in group max-w-[80px]
        ${isPressed ? 'scale-95' : 'hover:scale-105'}
      `}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={style}
      title={title}
    >
      <div className="text-white drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-200">
        {icon}
      </div>
      <span className="text-white text-xs mt-1 text-center font-medium drop-shadow-md leading-tight">
        {title}
      </span>
    </div>
  );
};
