
import React, { useState } from 'react';
import { CheckCircle, Info, AlertTriangle, X, Bell } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

interface NotificationSystemProps {
  notifications: Notification[];
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications }) => {
  const [soundEnabled] = useState(true);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getGradient = (type: string) => {
    switch (type) {
      case 'success':
        return 'from-green-50 to-emerald-50 border-green-200';
      case 'warning':
        return 'from-yellow-50 to-amber-50 border-yellow-200';
      default:
        return 'from-blue-50 to-indigo-50 border-blue-200';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            bg-gradient-to-r ${getGradient(notification.type)} 
            backdrop-blur-xl shadow-2xl rounded-2xl p-4 border 
            animate-slide-in-right max-w-sm hover:scale-105 
            transform transition-all duration-300 cursor-pointer
            group hover:shadow-3xl
          `}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-1 rounded-full bg-white/50">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-4 h-4 text-gray-600 animate-pulse" />
                <h4 className="font-bold text-gray-800 text-sm">Portfolio OS</h4>
              </div>
              <p className="text-sm text-gray-700 font-medium">{notification.message}</p>
              <div className="text-xs text-gray-500 mt-1">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-white/50">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Progress bar animation */}
          <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
