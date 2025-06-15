import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiUser,
  FiSettings,
  FiBell,
  FiFolder,
  FiHome,
  FiLogOut,
} from "react-icons/fi";

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

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 hover:underline ${
      isActive ? "font-bold text-yellow-300" : ""
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-red-600 text-white p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-6">Patient Portal</h2>
          <nav className="flex flex-col gap-3">
            <NavLink to="/patient/dashboard" className={navLinkClass}>
              <FiHome /> Dashboard
            </NavLink>
            <NavLink to="/patient/profile" className={navLinkClass}>
              <FiUser /> Profile
            </NavLink>
            <NavLink to="/patient/settings" className={navLinkClass}>
              <FiSettings /> Settings
            </NavLink>
            <NavLink to="/patient/notifications" className={navLinkClass}>
              <FiBell /> Notifications
            </NavLink>
            <NavLink to="/patient/medicalhistory" className={navLinkClass}>
              <FiFolder /> Medical History
            </NavLink>
            <button onClick={handleLogout} className="flex items-center gap-2 text-left hover:underline">
              <FiLogOut /> Logout
            </button>
          </nav>
        </aside>

        {/* Mobile Toggle */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-red-600 text-white p-2 rounded"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          >
            <aside
              onClick={(e) => e.stopPropagation()}
              className="w-64 bg-red-600 text-white p-6 space-y-4 absolute left-0 top-0 bottom-0"
            >
              <h2 className="text-2xl font-bold mb-6">Patient Portal</h2>
              <nav className="flex flex-col gap-3">
                <NavLink to="/patient/dashboard" onClick={() => setIsOpen(false)} className={navLinkClass}>
                  <FiHome /> Dashboard
                </NavLink>
                <NavLink to="/patient/profile" onClick={() => setIsOpen(false)} className={navLinkClass}>
                  <FiUser /> Profile
                </NavLink>
                <NavLink to="/patient/settings" onClick={() => setIsOpen(false)} className={navLinkClass}>
                  <FiSettings /> Settings
                </NavLink>
                <NavLink to="/patient/notifications" onClick={() => setIsOpen(false)} className={navLinkClass}>
                  <FiBell /> Notifications
                </NavLink>
                <NavLink to="/patient/medicalhistory" onClick={() => setIsOpen(false)} className={navLinkClass}>
                  <FiFolder /> Medical History
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-left hover:underline"
                >
                  <FiLogOut /> Logout
                </button>
              </nav>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6 w-full">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t text-center text-sm text-gray-600 py-4">
        &copy; {new Date().getFullYear()} FCAHPT Medical Centre Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default PatientLayout;