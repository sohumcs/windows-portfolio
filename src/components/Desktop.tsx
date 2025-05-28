
import React, { useState } from 'react';
import { DesktopIcon } from './DesktopIcon';
import { WindowManager } from './WindowManager';
import { ModernTaskbar } from './ModernTaskbar';
import { ModernStartMenu } from './ModernStartMenu';
import { NotificationSystem } from './NotificationSystem';
import { User, Briefcase, FileText, ExternalLink, Clock, Trash2, Terminal, Palette } from 'lucide-react';

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
      icon: <User className="w-10 h-10 text-blue-500" />, 
      component: 'AboutMe' 
    },
    { 
      id: 'projects', 
      title: 'My Projects', 
      icon: <Briefcase className="w-10 h-10 text-green-500" />, 
      component: 'Projects' 
    },
    { 
      id: 'resume', 
      title: 'Resume', 
      icon: <FileText className="w-10 h-10 text-red-500" />, 
      component: 'Resume' 
    },
    { 
      id: 'connect', 
      title: 'Connect', 
      icon: <ExternalLink className="w-10 h-10 text-purple-500" />, 
      component: 'Connect' 
    },
    { 
      id: 'experience', 
      title: 'Work Experience', 
      icon: <Clock className="w-10 h-10 text-orange-500" />, 
      component: 'Experience' 
    },
    { 
      id: 'terminal', 
      title: 'Terminal', 
      icon: <Terminal className="w-10 h-10 text-gray-600" />, 
      component: 'Terminal' 
    },
    { 
      id: 'theme', 
      title: 'Theme Settings', 
      icon: <Palette className="w-10 h-10 text-pink-500" />, 
      component: 'ThemeSettings' 
    },
    { 
      id: 'recycle', 
      title: 'Recycle Bin', 
      icon: <Trash2 className="w-10 h-10 text-gray-500" />, 
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

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark' : ''}`}>
      {/* Background with uploaded image */}
      <div 
        className="min-h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('/lovable-uploads/fdd6a3b7-415d-4e64-a0c4-c717fdfa2578.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        onClick={() => setShowStartMenu(false)}
      >
        {/* Dark theme overlay */}
        {isDark && <div className="absolute inset-0 bg-black/40" />}

        {/* Desktop Icons Grid - Aligned to the left */}
        <div className="absolute inset-0 p-6">
          <div className="flex flex-col gap-4 items-start">
            {desktopIcons.map((icon, index) => (
              <DesktopIcon
                key={icon.id}
                {...icon}
                onClick={() => openWindow(icon)}
                style={{ animationDelay: `${index * 100}ms` }}
                isDark={isDark}
              />
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
        />

        {/* Modern Start Menu */}
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

        {/* Modern Taskbar */}
        <ModernTaskbar
          openWindows={openWindows}
          onStartClick={() => setShowStartMenu(!showStartMenu)}
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
