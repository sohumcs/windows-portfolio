
import React from 'react';
import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

interface NotificationSystemProps {
  notifications: Notification[];
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-xl p-4 border border-gray-200/50 animate-slide-in-right max-w-sm"
        >
          <div className="flex items-start gap-3">
            {getIcon(notification.type)}
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Portfolio OS</h4>
              <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
