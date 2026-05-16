// src/NotificationContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => {
      const notification = prev.find(n => n.id === id);
      if (notification && !notification.read) {
        setUnreadCount(prevCount => Math.max(0, prevCount - 1));
      }
      return prev.filter(n => n.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  // Common notification types
  const notifyAppointment = useCallback((data) => {
    addNotification({
      type: 'appointment',
      title: 'New Appointment',
      message: `You have an appointment with ${data.doctorName} at ${data.time}`,
      priority: 'high',
      action: `/appointments/${data.id}`
    });
  }, [addNotification]);

  const notifyTestResult = useCallback((data) => {
    addNotification({
      type: 'test_result',
      title: 'Test Results Ready',
      message: `Your ${data.testType} results are now available`,
      priority: 'medium',
      action: `/results/${data.id}`
    });
  }, [addNotification]);

  const notifyPrescription = useCallback((data) => {
    addNotification({
      type: 'prescription',
      title: 'New Prescription',
      message: `Dr. ${data.doctorName} has prescribed ${data.medication}`,
      priority: 'medium',
      action: `/prescriptions/${data.id}`
    });
  }, [addNotification]);

  const notifyEmergency = useCallback((data) => {
    addNotification({
      type: 'emergency',
      title: 'Emergency Alert',
      message: data.message || 'Emergency situation detected',
      priority: 'critical',
      action: '/emergency'
    });
  }, [addNotification]);

  const notifySystem = useCallback((data) => {
    addNotification({
      type: 'system',
      title: data.title || 'System Notification',
      message: data.message,
      priority: data.priority || 'low'
    });
  }, [addNotification]);

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    notifyAppointment,
    notifyTestResult,
    notifyPrescription,
    notifyEmergency,
    notifySystem
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};