import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const PatientLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/patient/login");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:block w-64 bg-red-600 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Patient Portal</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/patient/profile" className="hover:underline">Profile</Link>
          <Link to="/patient/settings" className="hover:underline">Settings</Link>
          <Link to="/patient/notifications" className="hover:underline">Notifications</Link>
          <Link to="/patient/MedicalHistory" className="hover:underline">Medical History</Link>
          <button onClick={handleLogout} className="text-left hover:underline">Logout</button>
        </nav>
      </aside>

      {/* Mobile menu toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-red-600 text-white p-2 rounded"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}>
          <aside
            onClick={(e) => e.stopPropagation()}
            className="w-64 bg-red-600 text-white p-6 space-y-4 absolute left-0 top-0 bottom-0"
          >
            <h2 className="text-2xl font-bold mb-6">Patient Portal</h2>
            <nav className="flex flex-col gap-3">
              <Link to="/patient/profile" onClick={() => setIsOpen(false)} className="hover:underline">Profile</Link>
              <Link to="/patient/settings" onClick={() => setIsOpen(false)} className="hover:underline">Settings</Link>
              <Link to="/patient/notifications" onClick={() => setIsOpen(false)} className="hover:underline">Notifications</Link>
              <Link to="/patient/MedicalHistory" onClick={() => setIsOpen(false)} className="hover:underline">Medical History</Link>
              <button onClick={handleLogout} className="text-left hover:underline">Logout</button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow p-4 md:p-6">{children}</main>
    </div>
  );
};

export default PatientLayout;