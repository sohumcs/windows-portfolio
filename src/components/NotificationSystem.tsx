
import React from 'react';
import { CheckCircle, Info, AlertTriangle } from 'lucide-react';

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
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white shadow-lg rounded-lg p-3 border-l-4 border-blue-500 animate-slide-in-right max-w-sm"
        >
          <div className="flex items-center gap-2">
            {getIcon(notification.type)}
            <span className="text-sm font-medium text-gray-800">
              {notification.message}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
