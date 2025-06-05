import React, { useState } from 'react';
import { DesktopIcon } from './DesktopIcon';
import { WindowManager } from './WindowManager';
import { ModernTaskbar } from './ModernTaskbar';
import { ModernStartMenu } from './ModernStartMenu';
import { NotificationSystem } from './NotificationSystem';
import { User, Briefcase, FileText, ExternalLink, Clock, Trash2, Terminal, Palette, Gamepad, Search, Book, Paintbrush } from 'lucide-react';

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
      title: 'My Briefcase', 
      icon: (
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 border border-gray-800 rounded-sm shadow-lg transform perspective-100 rotate-y-5">
            <div className="absolute inset-0.5 bg-gradient-to-b from-yellow-200 to-yellow-500 rounded-sm">
              <div className="w-full h-2 bg-gradient-to-b from-gray-600 to-gray-800 rounded-t-sm"></div>
              <div className="flex justify-center mt-1">
                <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ), 
      component: 'AboutMe' 
    },
    { 
      id: 'projects', 
      title: 'My Projects', 
      icon: (
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 bg-gradient-to-b from-blue-300 via-blue-400 to-blue-600 border border-gray-800 rounded-sm shadow-lg">
            <div className="absolute inset-0.5 bg-gradient-to-b from-blue-200 to-blue-500 rounded-sm">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-4 h-3 bg-white rounded-sm mb-0.5 border border-gray-400"></div>
                <div className="w-3 h-0.5 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ), 
      component: 'Projects' 
    },
    { 
      id: 'resume', 
      title: 'Resume', 
      icon: (
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 bg-gradient-to-b from-white via-gray-100 to-gray-300 border border-gray-800 rounded-sm shadow-lg">
            <div className="absolute inset-0.5 bg-gradient-to-b from-white to-gray-200 rounded-sm">
              <div className="flex flex-col p-1 h-full">
                <div className="w-full h-0.5 bg-gray-400 mb-0.5"></div>
                <div className="w-3/4 h-0.5 bg-gray-400 mb-0.5"></div>
                <div className="w-full h-0.5 bg-gray-400 mb-0.5"></div>
                <div className="w-2/3 h-0.5 bg-gray-400"></div>
              </div>
            </div>
          </div>
        </div>
      ), 
      component: 'Resume' 
    },
    { 
      id: 'connect', 
      title: 'Network', 
      icon: (
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 border border-gray-800 rounded-sm shadow-lg">
            <div className="absolute inset-0.5 bg-gradient-to-b from-gray-200 to-gray-500 rounded-sm">
              <div className="flex items-center justify-center h-full">
                <div className="w-4 h-3 bg-black rounded-sm border border-gray-300">
                  <div className="w-full h-1 bg-green-400 rounded-t-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ), 
      component: 'Connect' 
    },
    { 
      id: 'experience', 
      title: 'Control Panel', 
      icon: (
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 border border-gray-800 rounded-sm shadow-lg">
            <div className="absolute inset-0.5 bg-gradient-to-b from-gray-200 to-gray-500 rounded-sm">
              <div className="grid grid-cols-2 gap-0.5 p-1 h-full">
                <div className="bg-blue-500 rounded-sm"></div>
                <div className="bg-red-500 rounded-sm"></div>
                <div className="bg-green-500 rounded-sm"></div>
                <div className="bg-yellow-500 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      ), 
      component: 'Experience' 
    },
    { 
      id: 'terminal', 
      title: 'MS-DOS Prompt', 
      icon: (
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 bg-black border border-gray-800 rounded-sm shadow-lg">
            <div className="absolute inset-0.5 bg-black rounded-sm p-1">
              <div className="text-green-400 text-xs font-mono">C:\</div>
              <div className="w-1 h-2 bg-green-400 animate-pulse"></div>
            </div>
          </div>
        </div>
      ), 
      component: 'Terminal' 
    },
    { 
      id: 'paint', 
      title: 'Paint', 
      icon: (
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 bg-gradient-to-b from-white via-gray-100 to-gray-300 border border-gray-800 rounded-sm shadow-lg">
            <div className="absolute inset-0.5 bg-gradient-to-b from-white to-gray-200 rounded-sm">
              <div className="relative h-full">
                <div className="absolute top-1 left-1 w-2 h-3 bg-yellow-400 rounded-sm transform rotate-12"></div>
                <div className="absolute top-2 right-1 w-1 h-2 bg-red-500 rounded-sm"></div>
                <div className="absolute bottom-1 left-2 w-1 h-1 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ), 
      component: 'Paint' 
    },
    { 
      id: 'myspace', 
      title: 'MySpace', 
      icon: (
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 bg-gradient-to-b from-white via-gray-100 to-gray-300 border border-gray-800 rounded-sm shadow-lg">
            <div className="absolute inset-0.5 bg-gradient-to-b from-white to-gray-200 rounded-sm">
              <div className="flex flex-col p-1 h-full">
                <div className="w-full h-0.5 bg-blue-400 mb-0.5"></div>
                <div className="w-4 h-0.5 bg-gray-400 mb-0.5"></div>
                <div className="w-5 h-0.5 bg-gray-400 mb-0.5"></div>
                <div className="w-3 h-0.5 bg-gray-400"></div>
              </div>
            </div>
          </div>
        </div>
      ), 
      component: 'MySpace' 
    },
    { 
      id: 'games', 
      title: 'Games', 
      icon: (
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 bg-gradient-to-b from-red-300 via-red-400 to-red-600 border border-gray-800 rounded-sm shadow-lg">
            <div className="absolute inset-0.5 bg-gradient-to-b from-red-200 to-red-500 rounded-sm">
              <div className="flex items-center justify-center h-full">
                <div className="w-4 h-3 bg-white rounded-sm border border-gray-400">
                  <div className="flex justify-center items-center h-full">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ), 
      component: 'Games' 
    },
    { 
      id: 'browser', 
      title: 'Internet Explorer', 
      icon: (
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700 border border-gray-800 rounded-sm shadow-lg">
            <div className="absolute inset-0.5 bg-gradient-to-b from-blue-200 to-blue-600 rounded-sm">
              <div className="flex items-center justify-center h-full">
                <div className="w-4 h-4 border-2 border-white rounded-full">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full flex items-center justify-center">
                    <div className="text-xs font-bold text-blue-800">e</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ), 
      component: 'Browser' 
    },
    { 
      id: 'recycle', 
      title: 'Recycle Bin', 
      icon: (
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 border border-gray-800 rounded-sm shadow-lg">
            <div className="absolute inset-0.5 bg-gradient-to-b from-gray-200 to-gray-500 rounded-sm">
              <div className="flex items-center justify-center h-full">
                <div className="w-4 h-5 bg-gradient-to-b from-gray-600 to-gray-800 rounded-sm">
                  <div className="w-full h-1 bg-gray-500 rounded-t-sm"></div>
                  <div className="flex justify-center mt-0.5">
                    <div className="w-2 h-2 border border-gray-300 rounded-sm bg-gray-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      <div 
        className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/5f85bb9d-f696-471b-9300-4553b6e2010e.png')`,
          backgroundColor: '#008080'
        }}
      >
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

        <WindowManager
          windows={openWindows}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onUpdatePosition={updateWindowPosition}
          isDark={isDark}
          onThemeChange={toggleTheme}
        />

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

        <NotificationSystem notifications={notifications} />
      </div>
    </div>
  );
};
