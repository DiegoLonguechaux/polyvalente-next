"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type NotificationContextType = {
  unreadCount: number;
  refreshUnreadCount: () => Promise<void>;
  updateUnreadCount: (amount: number) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = async () => {
    try {
      const res = await fetch('/api/contact/stats');
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.unprocessedCount);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const updateUnreadCount = (amount: number) => {
    setUnreadCount(prev => Math.max(0, prev + amount));
  };

  useEffect(() => {
    refreshUnreadCount();
    const interval = setInterval(refreshUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{ unreadCount, refreshUnreadCount, updateUnreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
