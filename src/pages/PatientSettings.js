import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

const PatientSettings = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // Load image from localStorage on mount
  useEffect(() => {
    const storedImage = localStorage.getItem("patientProfileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleResetPassword = (e) => {
    e.preventDefault();
    alert("Password reset request submitted.");
    setOldPassword("");
    setNewPassword("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem("patientProfileImage", imageUrl);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {/* Profile Image Upload */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Profile Picture</label>
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover mb-2 border"
          />
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {/* Theme Toggle */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Theme</label>
        <div className="flex gap-4">
          <button
            onClick={() => setDarkMode(false)}
            className={`px-4 py-2 rounded ${!darkMode ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          >
            Light Mode
          </button>
          <button
            onClick={() => setDarkMode(true)}
            className={`px-4 py-2 rounded ${darkMode ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          >
            Dark Mode
          </button>
        </div>
      </div>

      {/* Notification Toggle */}
      <div className="mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          Enable pop-up notifications
        </label>
      </div>

      {/* Reset Password */}
      <form onSubmit={handleResetPassword} className="space-y-4">
        <h3 className="font-semibold">Reset Password</h3>
        <input
          type="password"
          placeholder="Old Password"
          className="w-full border p-2 rounded"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default PatientSettings;
