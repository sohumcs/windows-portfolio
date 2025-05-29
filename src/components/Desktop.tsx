
import React, { useState } from 'react';
import { DesktopIcon } from './DesktopIcon';
import { WindowManager } from './WindowManager';
import { ModernTaskbar } from './ModernTaskbar';
import { ModernStartMenu } from './ModernStartMenu';
import { NotificationSystem } from './NotificationSystem';
import { User, Briefcase, FileText, ExternalLink, Clock, Trash2, Terminal, Palette, Gamepad, Search, Book } from 'lucide-react';

export interface WindowConfig {
  id: string;
  title: string;
  component: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
}

export const Desktop = () => {
  const [isDark, setIsDark] = useState(false);
  const [openWindows, setOpenWindows] = useState<WindowConfig[]>([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'info' | 'success' | 'warning'}>>([]);

  const desktopIcons = [
    { 
      id: 'about', 
      title: 'About Me', 
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-gray-800 flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      ), 
      component: 'AboutMe' 
    },
    { 
      id: 'projects', 
      title: 'My Projects', 
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 border-2 border-gray-800 flex items-center justify-center">
          <Briefcase className="w-4 h-4 text-white" />
        </div>
      ), 
      component: 'Projects' 
    },
    { 
      id: 'resume', 
      title: 'Resume', 
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 border-2 border-gray-800 flex items-center justify-center">
          <FileText className="w-4 h-4 text-white" />
        </div>
      ), 
      component: 'Resume' 
    },
    { 
      id: 'connect', 
      title: 'Connect', 
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-gray-800 flex items-center justify-center">
          <ExternalLink className="w-4 h-4 text-white" />
        </div>
      ), 
      component: 'Connect' 
    },
    { 
      id: 'experience', 
      title: 'Work Experience', 
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-gray-800 flex items-center justify-center">
          <Clock className="w-4 h-4 text-white" />
        </div>
      ), 
      component: 'Experience' 
    },
    { 
      id: 'terminal', 
      title: 'Terminal', 
      icon: (
        <div className="w-8 h-8 bg-black border-2 border-gray-800 flex items-center justify-center">
          <Terminal className="w-4 h-4 text-green-400" />
        </div>
      ), 
      component: 'Terminal' 
    },
    { 
      id: 'theme', 
      title: 'Theme Settings', 
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-gray-800 flex items-center justify-center">
          <Palette className="w-4 h-4 text-white" />
        </div>
      ), 
      component: 'ThemeSettings' 
    },
    { 
      id: 'myspace', 
      title: 'MySpace', 
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 border-2 border-gray-800 flex items-center justify-center">
          <Book className="w-4 h-4 text-white" />
        </div>
      ), 
      component: 'MySpace' 
    },
    { 
      id: 'games', 
      title: 'Games', 
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-gray-800 flex items-center justify-center">
          <Gamepad className="w-4 h-4 text-white" />
        </div>
      ), 
      component: 'Games' 
    },
    { 
      id: 'browser', 
      title: 'Internet Explorer', 
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-gray-800 flex items-center justify-center">
          <Search className="w-4 h-4 text-white" />
        </div>
      ), 
      component: 'Browser' 
    },
    { 
      id: 'recycle', 
      title: 'Recycle Bin', 
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 border-2 border-gray-800 flex items-center justify-center">
          <Trash2 className="w-4 h-4 text-white" />
        </div>
      ), 
      component: 'RecycleBin' 
    },
  ];

  const openWindow = (iconConfig: any) => {
    const existingWindow = openWindows.find(w => w.id === iconConfig.id);
    if (existingWindow) {
      setOpenWindows(prev => prev.map(w => 
        w.id === iconConfig.id 
          ? { ...w, isMinimized: false }
          : w
      ));
      return;
    }

    const newWindow: WindowConfig = {
      id: iconConfig.id,
      title: iconConfig.title,
      component: iconConfig.component,
      icon: iconConfig.icon,
      position: { x: 100 + openWindows.length * 30, y: 80 + openWindows.length * 30 },
      size: { width: 900, height: 700 },
      isMinimized: false,
      isMaximized: false,
    };

    setOpenWindows(prev => [...prev, newWindow]);
    addNotification(`${iconConfig.title} opened`, 'info');
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  };

  const addNotification = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    addNotification(`Switched to ${isDark ? 'Light' : 'Dark'} mode`, 'success');
  };

  const handleStartClick = () => {
    setShowStartMenu(!showStartMenu);
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowStartMenu(false);
    }
  };

  // Calculate grid layout for icons
  const getIconsInColumns = () => {
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const taskbarHeight = 48;
    const iconHeight = 80;
    const topPadding = 16;
    const availableHeight = screenHeight - taskbarHeight - topPadding;
    const iconsPerColumn = Math.floor(availableHeight / iconHeight);
    
    const columns: any[][] = [];
    let currentColumn = 0;
    
    desktopIcons.forEach((icon, index) => {
      if (!columns[currentColumn]) {
        columns[currentColumn] = [];
      }
      
      columns[currentColumn].push(icon);
      
      if ((index + 1) % iconsPerColumn === 0) {
        currentColumn++;
      }
    });
    
    return columns;
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ${isDark ? 'dark' : ''}`}
      onClick={handleDesktopClick}
    >
      {/* Windows 95 Blue Sky Background */}
      <div 
        className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/5f85bb9d-f696-471b-9300-4553b6e2010e.png')`,
          backgroundColor: '#008080'
        }}
      >
        {/* Desktop Icons in Column Layout */}
        <div className="absolute inset-0 p-4 pb-16">
          <div className="flex gap-2 h-full">
            {getIconsInColumns().map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-2">
                {column.map((icon, index) => (
                  <DesktopIcon
                    key={icon.id}
                    {...icon}
                    onClick={() => openWindow(icon)}
                    style={{ animationDelay: `${(columnIndex * column.length + index) * 100}ms` }}
                    isDark={isDark}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Window Manager */}
        <WindowManager
          windows={openWindows}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onUpdatePosition={updateWindowPosition}
          isDark={isDark}
          onThemeChange={toggleTheme}
        />

        {/* Start Menu */}
        {showStartMenu && (
          <ModernStartMenu
            onClose={() => setShowStartMenu(false)}
            onThemeToggle={toggleTheme}
            onOpenAll={() => {
              desktopIcons.slice(0, 5).forEach(icon => openWindow(icon));
              addNotification('All windows opened!', 'success');
            }}
            onOpenResume={() => openWindow(desktopIcons.find(icon => icon.id === 'resume')!)}
            isDark={isDark}
          />
        )}

        {/* Taskbar */}
        <ModernTaskbar
          openWindows={openWindows}
          onStartClick={handleStartClick}
          onWindowClick={(id) => {
            const window = openWindows.find(w => w.id === id);
            if (window?.isMinimized) {
              setOpenWindows(prev => prev.map(w => 
                w.id === id ? { ...w, isMinimized: false } : w
              ));
            }
          }}
          isDark={isDark}
        />

        {/* Notification System */}
        <NotificationSystem notifications={notifications} />
      </div>
    </div>
  );
};
