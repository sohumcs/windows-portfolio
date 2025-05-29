
import React from 'react';
import { WindowConfig } from './Desktop';
import { WindowFrame } from './WindowFrame';
import { AboutMe } from './windows/AboutMe';
import { Projects } from './windows/Projects';
import { Resume } from './windows/Resume';
import { Connect } from './windows/Connect';
import { Experience } from './windows/Experience';
import { Terminal } from './windows/Terminal';
import { RecycleBin } from './windows/RecycleBin';
import { ThemeSettings } from './windows/ThemeSettings';
import { MySpace } from './windows/MySpace';
import { Games } from './windows/Games';
import { Browser } from './windows/Browser';
import { Paint } from './windows/Paint';

interface WindowManagerProps {
  windows: WindowConfig[];
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onUpdatePosition: (id: string, position: { x: number; y: number }) => void;
  isDark: boolean;
  onThemeChange?: (isDark: boolean) => void;
}

export const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  onClose,
  onMinimize,
  onMaximize,
  onUpdatePosition,
  isDark,
  onThemeChange
}) => {
  const renderWindowContent = (component: string, windowId: string) => {
    switch (component) {
      case 'AboutMe':
        return <AboutMe />;
      case 'Projects':
        return <Projects />;
      case 'Resume':
        return <Resume />;
      case 'Connect':
        return <Connect />;
      case 'Experience':
        return <Experience />;
      case 'Terminal':
        return <Terminal />;
      case 'RecycleBin':
        return <RecycleBin />;
      case 'ThemeSettings':
        return <ThemeSettings isDark={isDark} onThemeChange={onThemeChange || (() => {})} />;
      case 'MySpace':
        return <MySpace />;
      case 'Games':
        return <Games />;
      case 'Browser':
        return <Browser />;
      case 'Paint':
        return <Paint />;
      default:
        return <div className="p-4">Content not found</div>;
    }
  };

  return (
    <>
      {windows.map((window) => (
        <WindowFrame
          key={window.id}
          window={window}
          onClose={() => onClose(window.id)}
          onMinimize={() => onMinimize(window.id)}
          onMaximize={() => onMaximize(window.id)}
          onUpdatePosition={(position) => onUpdatePosition(window.id, position)}
          isDark={isDark}
        >
          {renderWindowContent(window.component, window.id)}
        </WindowFrame>
      ))}
    </>
  );
};
