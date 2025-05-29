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

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark' : ''}`}>
      {/* Classic Windows 95 Teal Background */}
      <div 
        className={`min-h-screen relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black' 
            : 'bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500'
        }`}
        onClick={() => setShowStartMenu(false)}
      >
        {/* Desktop Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Desktop Icons Grid - Responsive layout */}
        <div className="absolute inset-0 p-4 pb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 h-full content-start">
            {desktopIcons.map((icon, index) => (
              <div key={icon.id} className="flex justify-center">
                <DesktopIcon
                  {...icon}
                  onClick={() => openWindow(icon)}
                  style={{ animationDelay: `${index * 100}ms` }}
                  isDark={isDark}
                />
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
