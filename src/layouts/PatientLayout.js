import React from "react";
import { useNavigate, Link } from "react-router-dom";

const PatientLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear();
      navigate("/patient/login");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-red-600 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Patient Portal</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/PatientProfile" className="hover:underline">Profile</Link>
          <Link to="/PatientSettings" className="hover:underline">Settings</Link>
          <Link to="/PatientNotifications" className="hover:underline">Notifications</Link>
          <Link to="/MedicalHistory" className="hover:underline">Medical History</Link>

          {/* Logout with confirmation */}
          <button
            onClick={handleLogout}
            className="text-left hover:underline"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-grow p-6">{children}</main>
    </div>
  );
};

export default PatientLayout;
