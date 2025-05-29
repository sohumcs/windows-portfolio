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
      icon: <User className="w-8 h-8 text-blue-600" />, 
      component: 'AboutMe' 
    },
    { 
      id: 'projects', 
      title: 'My Projects', 
      icon: <Briefcase className="w-8 h-8 text-green-600" />, 
      component: 'Projects' 
    },
    { 
      id: 'resume', 
      title: 'Resume', 
      icon: <FileText className="w-8 h-8 text-red-600" />, 
      component: 'Resume' 
    },
    { 
      id: 'connect', 
      title: 'Connect', 
      icon: <ExternalLink className="w-8 h-8 text-purple-600" />, 
      component: 'Connect' 
    },
    { 
      id: 'experience', 
      title: 'Work Experience', 
      icon: <Clock className="w-8 h-8 text-orange-600" />, 
      component: 'Experience' 
    },
    { 
      id: 'terminal', 
      title: 'Terminal', 
      icon: <Terminal className="w-8 h-8 text-gray-800" />, 
      component: 'Terminal' 
    },
    { 
      id: 'theme', 
      title: 'Theme Settings', 
      icon: <Palette className="w-8 h-8 text-pink-600" />, 
      component: 'ThemeSettings' 
    },
    { 
      id: 'myspace', 
      title: 'MySpace', 
      icon: <Book className="w-8 h-8 text-cyan-600" />, 
      component: 'MySpace' 
    },
    { 
      id: 'games', 
      title: 'Games', 
      icon: <Gamepad className="w-8 h-8 text-indigo-600" />, 
      component: 'Games' 
    },
    { 
      id: 'browser', 
      title: 'Internet Explorer', 
      icon: <Search className="w-8 h-8 text-blue-800" />, 
      component: 'Browser' 
    },
    { 
      id: 'recycle', 
      title: 'Recycle Bin', 
      icon: <Trash2 className="w-8 h-8 text-gray-600" />, 
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
      onClick={() => setShowStartMenu(false)}
    >
      {/* Windows 95 Blue Sky Background */}
      <div 
        className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/fdd6a3b7-415d-4e64-a0c4-c717fdfa2578.png')`,
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
