import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const Notifications: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<{ id: number; title: string; message: string; time: string; read: boolean }[]>([]);

  useEffect(() => {
    // Simulate fetching notifications from backend
    // In a real app, replace this with an API call
    const fetchNotifications = async () => {
      // Mock fetching notifications
      const fetchedNotifications: { id: number; title: string; message: string; time: string; read: boolean }[] = [];
      setNotifications(fetchedNotifications);
    };

    fetchNotifications();

    // Simulate user login notification
    const loginNotification = {
      id: Date.now(),
      title: 'You logged in successfully',
      message: 'Welcome back!',
      time: 'Just now',
      read: false
    };
    setNotifications(prevNotifications => [loginNotification, ...prevNotifications]);
  }, []);

  const handleNotificationClick = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Bell className="h-6 w-6 text-gray-600" />
        {notifications.some(n => !n.read) && (
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-500">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No new notifications
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;