import React, { useState, useEffect } from 'react';
import { Bell, X, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function NotificationCenter({ tasks, isDarkMode, themeClasses }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [dismissedIds, setDismissedIds] = useState(() => {
    const saved = localStorage.getItem('dismissedNotifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    checkNotifications();
    
    const interval = setInterval(checkNotifications, 60000);
    
    return () => clearInterval(interval);
  }, [tasks, dismissedIds]);

  useEffect(() => {
    localStorage.setItem('dismissedNotifications', JSON.stringify(dismissedIds));
  }, [dismissedIds]);

  const checkNotifications = () => {
    const now = new Date();
    const newNotifications = [];

    tasks.forEach(task => {
      if (task.completed) return;
      
      if (!task.dueDate) return;

      if (dismissedIds.includes(task.id)) return;

      const dueDate = new Date(task.dueDate);
      const diffTime = dueDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

      let notification = null;

      if (diffTime < 0) {
        notification = {
          id: task.id,
          taskTitle: task.title,
          type: 'overdue',
          priority: 'high',
          message: `Overdue by ${Math.abs(diffDays)} day(s)`,
          icon: AlertTriangle,
          color: 'red'
        };
      }
      else if (diffDays === 0) {
        notification = {
          id: task.id,
          taskTitle: task.title,
          type: 'today',
          priority: 'high',
          message: `Due today at ${dueDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`,
          icon: Clock,
          color: 'red'
        };
      }
      else if (diffDays === 1) {
        notification = {
          id: task.id,
          taskTitle: task.title,
          type: 'tomorrow',
          priority: 'medium',
          message: 'Due tomorrow',
          icon: Clock,
          color: 'yellow'
        };
      }
      else if (diffDays <= 3) {
        notification = {
          id: task.id,
          taskTitle: task.title,
          type: 'upcoming',
          priority: 'medium',
          message: `Due in ${diffDays} days`,
          icon: Bell,
          color: 'yellow'
        };
      }
      else if (diffDays <= 7) {
        notification = {
          id: task.id,
          taskTitle: task.title,
          type: 'week',
          priority: 'low',
          message: `Due in ${diffDays} days`,
          icon: Bell,
          color: 'blue'
        };
      }

      if (notification) {
        newNotifications.push(notification);
      }
    });

    const priorityOrder = { high: 0, medium: 1, low: 2 };
    newNotifications.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    setNotifications(newNotifications);
  };

  const dismissNotification = (id) => {
    setDismissedIds(prev => [...prev, id]);
  };

  const clearDismissed = () => {
    setDismissedIds([]);
  };

  const notificationCount = notifications.length;

  const getColorClasses = (color) => {
    const colors = {
      red: {
        bg: isDarkMode ? 'bg-red-900/30' : 'bg-red-50',
        border: isDarkMode ? 'border-red-700' : 'border-red-200',
        text: isDarkMode ? 'text-red-400' : 'text-red-700',
        icon: isDarkMode ? 'text-red-400' : 'text-red-600'
      },
      yellow: {
        bg: isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-50',
        border: isDarkMode ? 'border-yellow-700' : 'border-yellow-200',
        text: isDarkMode ? 'text-yellow-400' : 'text-yellow-700',
        icon: isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
      },
      blue: {
        bg: isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50',
        border: isDarkMode ? 'border-blue-700' : 'border-blue-200',
        text: isDarkMode ? 'text-blue-400' : 'text-blue-700',
        icon: isDarkMode ? 'text-blue-400' : 'text-blue-600'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-3 rounded-full ${
          isDarkMode 
            ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        } shadow-lg transition-all duration-300 hover:scale-110`}
        title="Notifications"
      >
        <Bell className="w-6 h-6" />
        
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {notificationCount > 9 ? '9+' : notificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <div className={`absolute right-0 top-full mt-2 w-96 max-h-[500px] overflow-y-auto ${
            isDarkMode 
              ? 'bg-slate-800 border border-slate-700' 
              : 'bg-white border border-gray-200'
          } rounded-xl shadow-2xl z-50 transition-all duration-300`}>
            
            <div className={`sticky top-0 ${
              isDarkMode ? 'bg-slate-800' : 'bg-white'
            } border-b ${
              isDarkMode ? 'border-slate-700' : 'border-gray-200'
            } p-4 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <Bell className={`w-5 h-5 ${themeClasses.textPrimary}`} />
                <h3 className={`font-semibold ${themeClasses.textPrimary}`}>
                  Notifications
                </h3>
                {notificationCount > 0 && (
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    isDarkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-700'
                  }`}>
                    {notificationCount}
                  </span>
                )}
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-slate-700 text-slate-400' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2">
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className={`w-16 h-16 mx-auto mb-3 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`} />
                  <p className={`font-medium ${themeClasses.textPrimary}`}>
                    All caught up!
                  </p>
                  <p className={`text-sm ${themeClasses.textSecondary} mt-1`}>
                    No upcoming deadlines
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.map(notif => {
                    const colors = getColorClasses(notif.color);
                    const Icon = notif.icon;
                    
                    return (
                      <div
                        key={notif.id}
                        className={`p-3 rounded-lg border ${colors.bg} ${colors.border} transition-all hover:scale-[1.02]`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 ${colors.icon}`}>
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={`font-medium ${colors.text} truncate`}>
                              {notif.taskTitle}
                            </p>
                            <p className={`text-sm ${themeClasses.textSecondary} mt-0.5`}>
                              {notif.message}
                            </p>
                          </div>

                          <button
                            onClick={() => dismissNotification(notif.id)}
                            className={`p-1 rounded transition-colors ${
                              isDarkMode 
                                ? 'hover:bg-slate-700 text-slate-500' 
                                : 'hover:bg-gray-200 text-gray-400'
                            }`}
                            title="Dismiss"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {dismissedIds.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={clearDismissed}
                    className={`w-full py-2 text-sm ${
                      isDarkMode 
                        ? 'text-blue-400 hover:bg-slate-700' 
                        : 'text-blue-600 hover:bg-blue-50'
                    } rounded-lg transition-colors`}
                  >
                    Show {dismissedIds.length} dismissed notification{dismissedIds.length > 1 ? 's' : ''}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}