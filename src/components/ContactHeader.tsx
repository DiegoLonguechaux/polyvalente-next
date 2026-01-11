"use client";

import { useNotification } from "@/context/NotificationContext";

export default function ContactHeader() {
  const { unreadCount } = useNotification();
  
  return (
    <h1 className="text-3xl font-bold text-white mb-2">
      Messages reçus
      {unreadCount > 0 && (
        <span className="ml-4 text-lg bg-red-500 text-white px-3 py-1 rounded-full align-middle">
          {unreadCount} non traité{unreadCount > 1 ? 's' : ''}
        </span>
      )}
    </h1>
  );
}
