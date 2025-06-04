import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Settings = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();
    alert("Password reset simulated.");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="space-y-4">
        {/* Theme Toggle */}
        <div>
          <label className="font-medium">Theme:</label>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => setDarkMode(false)}
              className={`px-4 py-2 rounded ${!darkMode ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Light
            </button>
            <button
              onClick={() => setDarkMode(true)}
              className={`px-4 py-2 rounded ${darkMode ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Notification Toggle */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            />
            Enable pop-up notifications
          </label>
        </div>

        {/* Password Reset */}
        <form onSubmit={handleResetPassword} className="mt-6 space-y-3">
          <label className="block font-medium">Reset Password</label>
          <input
            type="password"
            placeholder="Old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
