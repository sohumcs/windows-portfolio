
import React, { useState } from 'react';
import { DesktopIcon } from './DesktopIcon';
import { WindowManager } from './WindowManager';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { NotificationSystem } from './NotificationSystem';
import { User, Briefcase, FileText, ExternalLink, Clock, Trash2, Terminal } from 'lucide-react';

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
    { id: 'about', title: 'About Me', icon: <User className="w-8 h-8" />, component: 'AboutMe' },
    { id: 'projects', title: 'My Projects', icon: <Briefcase className="w-8 h-8" />, component: 'Projects' },
    { id: 'resume', title: 'Resume', icon: <FileText className="w-8 h-8" />, component: 'Resume' },
    { id: 'connect', title: 'Connect', icon: <ExternalLink className="w-8 h-8" />, component: 'Connect' },
    { id: 'experience', title: 'Work Experience', icon: <Clock className="w-8 h-8" />, component: 'Experience' },
    { id: 'terminal', title: 'Terminal', icon: <Terminal className="w-8 h-8" />, component: 'Terminal' },
    { id: 'recycle', title: 'Recycle Bin', icon: <Trash2 className="w-8 h-8" />, component: 'RecycleBin' },
  ];

  const openWindow = (iconConfig: any) => {
    const existingWindow = openWindows.find(w => w.id === iconConfig.id);
    if (existingWindow) {
      // Bring to front and unminimize if minimized
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
      position: { x: 100 + openWindows.length * 30, y: 100 + openWindows.length * 30 },
      size: { width: 800, height: 600 },
      isMinimized: false,
      isMaximized: false,
    };

    setOpenWindows(prev => [...prev, newWindow]);
    
    // Show notification
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
    }, 3000);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark' : ''}`}>
      {/* Desktop Background */}
      <div 
        className="min-h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: isDark 
            ? "linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)"
            : "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><radialGradient id=\"a\" cx=\"50\" cy=\"50\" r=\"50\"><stop offset=\"0\" style=\"stop-color:%2387CEEB\"/><stop offset=\"1\" style=\"stop-color:%234682B4\"/></radialGradient></defs><rect width=\"100\" height=\"100\" fill=\"url(%23a)\"/></svg>')"
        }}
        onClick={() => setShowStartMenu(false)}
      >
        {/* Desktop Icons Grid */}
        <div className="absolute inset-0 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 content-start">
          {desktopIcons.map((icon, index) => (
            <DesktopIcon
              key={icon.id}
              {...icon}
              onClick={() => openWindow(icon)}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
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

        {/* Start Menu */}
        {showStartMenu && (
          <StartMenu
            onClose={() => setShowStartMenu(false)}
            onThemeToggle={() => setIsDark(!isDark)}
            onOpenAll={() => {
              desktopIcons.slice(0, 5).forEach(icon => openWindow(icon));
              addNotification('All windows opened!', 'success');
            }}
            isDark={isDark}
          />
        )}

        {/* Taskbar */}
        <Taskbar
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
