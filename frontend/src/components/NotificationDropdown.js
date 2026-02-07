import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { FaCheckDouble } from 'react-icons/fa';

const NotificationDropdown = () => {
  const { notifications, isOpen, loading, markAsRead, markAllAsRead } = useNotifications();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <h3>Notifications</h3>
        <button onClick={markAllAsRead} className="btn-link">
          <FaCheckDouble /> Mark all as read
        </button>
      </div>
      <div className="notification-list">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="notification-empty">No notifications</div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-item ${!notification.read ? 'unread' : ''}`}
              onClick={() => markAsRead(notification.id)}
            >
              <p>{notification.message}</p>
              <span className="notification-time">
                {new Date(notification.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;

