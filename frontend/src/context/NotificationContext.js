import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { notificationAPI } from '../services/api';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Hardcoded notifications for now
      const mockNotifications = [
        { id: 1, message: 'New task assigned to you: Task-101', read: false, createdAt: new Date().toISOString() },
        { id: 2, message: 'Your sprint "Sprint 1" has started.', read: false, createdAt: new Date().toISOString() },
        { id: 3, message: 'A new issue was reported in "Project X".', read: true, createdAt: new Date().toISOString() },
      ];
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
      // When backend is ready, replace with:
      // const response = await notificationAPI.getNotifications(user.userEmail);
      // setNotifications(response.data);
      // setUnreadCount(response.data.filter(n => !n.read).length);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      // fetchNotifications(); // Optionally fetch on load
    }
  }, [user]);

  const toggleOpen = () => {
    setIsOpen(prev => {
      if (!prev && notifications.length === 0) {
        fetchNotifications();
      }
      return !prev;
    });
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount(prev => (prev > 0 ? prev - 1 : 0));
    // Optionally call backend to mark as read
    // notificationAPI.markAsRead(id).catch(err => console.error("Failed to mark as read", err));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
    // Optionally call backend
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, isOpen, loading, toggleOpen, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

