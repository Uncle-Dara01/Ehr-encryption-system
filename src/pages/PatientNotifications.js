import React from "react";

const PatientNotifications = () => {
  // Simulated data — this can later come from your backend or localStorage
  const notifications = [
    {
      id: 1,
      message: "Your encrypted medical history was sent to your email.",
      date: "May 19, 2025",
      time: "10:30 AM",
    },
    {
      id: 2,
      message: "Your password was successfully changed.",
      date: "May 10, 2025",
      time: "3:45 PM",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
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
    </div>
  );
};

export default PatientNotifications;
