import React, { useState } from 'react';
import { Trash2, CheckCircle, AlertCircle, Info, Bell } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info';
  timestamp: string;
  read: boolean;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Payment Successful',
      message: 'Your course registration payment of NGN 5000 has been processed successfully.',
      type: 'success',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      title: 'Course Registration Deadline',
      message: 'Registration for the second semester closes in 3 days. Please ensure all courses are registered.',
      type: 'warning',
      timestamp: '1 day ago',
      read: false,
    },
    {
      id: '3',
      title: 'Transcript Ready',
      message: 'Your academic transcript has been processed and is ready for pickup.',
      type: 'success',
      timestamp: '3 days ago',
      read: true,
    },
    {
      id: '4',
      title: 'Schedule Update',
      message: 'Your class schedule has been updated. Please check your timetable for changes.',
      type: 'info',
      timestamp: '5 days ago',
      read: true,
    },
    {
      id: '5',
      title: 'Pending Payment',
      message: 'You have outstanding payments. Please visit the payments section to settle your fees.',
      type: 'warning',
      timestamp: '1 week ago',
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-[#22c55e]" />;
      case 'warning':
        return <AlertCircle size={20} className="text-[#f59e0b]" />;
      case 'info':
      default:
        return <Info size={20} className="text-[#3b82f6]" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-[#f0fdf4] border-l-4 border-[#22c55e]';
      case 'warning':
        return 'bg-[#fffbeb] border-l-4 border-[#f59e0b]';
      case 'info':
      default:
        return 'bg-[#eff6ff] border-l-4 border-[#3b82f6]';
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#1e293b] mb-1">Notifications</h1>
          <p className="text-sm text-gray-400">
            {notifications.filter(n => !n.read).length} unread notification{notifications.filter(n => !n.read).length !== 1 ? 's' : ''}
          </p>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="text-[12px] font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`${getBgColor(notif.type)} p-4 lg:p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex gap-4 items-start ${
                !notif.read ? 'ring-1 ring-gray-200' : ''
              }`}
              onClick={() => markAsRead(notif.id)}
            >
              <div className="shrink-0 mt-1">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-[14px] lg:text-[15px] font-bold text-[#1e293b] mb-1">
                      {notif.title}
                    </h3>
                    <p className="text-[12px] lg:text-[13px] text-gray-600 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                  {!notif.read && (
                    <div className="shrink-0 w-2 h-2 rounded-full bg-[#3b82f6] mt-1.5"></div>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 font-medium mt-2">
                  {notif.timestamp}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notif.id);
                }}
                className="shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Bell size={48} className="mb-4 opacity-50" />
          <h3 className="text-lg font-bold mb-1">No notifications</h3>
          <p className="text-sm">You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
