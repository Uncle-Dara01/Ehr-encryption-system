import React, { useEffect, useRef } from "react";
import axios from "axios";

const NotificationItem = ({ note, onMarkedAsRead }) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current || note.is_read) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          try {
            const token = localStorage.getItem("token");
            await axios.patch(
              `http://localhost:4040/patient/notifications/${note.id}/read`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            );
            onMarkedAsRead(note.id); // Update parent state
          } catch (error) {
            console.error("Failed to mark as read:", error);
          } finally {
            observer.disconnect();
          }
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [note, onMarkedAsRead]);

  return (
    <li
      ref={ref}
      className={`p-4 rounded border shadow-sm ${
        note.is_read ? "bg-white" : "bg-yellow-50 border-yellow-300"
      }`}
    >
      <p className="text-gray-700">{note.message}</p>
      <p className="text-sm text-gray-500">{note.date} at {note.time}</p>
    </li>
  );
};

export default NotificationItem;
