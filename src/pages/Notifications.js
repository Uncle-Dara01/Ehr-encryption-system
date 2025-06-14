import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get("http://localhost:4040/admin/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setNotifications(res.data.notifications || []);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {loading ? (
        <p className="text-gray-500">Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-500">You have no notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li key={note.id} className="p-4 bg-white dark:bg-gray-800 border rounded shadow">
              <p className="text-gray-800 dark:text-gray-100">{note.message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {note.date} at {note.time}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
