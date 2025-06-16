import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiBell,
  FiLogOut
} from "react-icons/fi";

const Sidebar = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkedAuth = () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/login");
      } else {
        setChecked(true);
      }
    };
    checkedAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  if (!checked) return <p className="text-center mt-5"></p>;

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded hover:bg-red-600 ${
      isActive ? "bg-red-600 font-semibold" : "bg-red-500"
    }`;

  return (
    <aside className="flex flex-col justify-between w-64 min-h-screen bg-red-500 text-white p-5">
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">EHR Admin</h2>
          <p className="text-sm text-red-100">Electronic Health Records</p>
        </div>

        <nav className="flex flex-col space-y-2">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <FiHome /> Dashboard
          </NavLink>
          <NavLink to="/admin/patients" className={linkClass}>
            <FiUsers /> Patients
          </NavLink>
          <NavLink to="/admin/settings" className={linkClass}>
            <FiSettings /> Settings
          </NavLink>
          <NavLink to="/admin/notifications" className={linkClass}>
            <FiBell /> Notifications
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-red-600 bg-red-500"
          >
            <FiLogOut /> Logout
          </button>
        </nav>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs mt-6 pt-4 border-t border-red-400 text-red-100">
        &copy; {new Date().getFullYear()} FCAHPT Medical Centre Portal.
      </footer>
    </aside>
  );
};

export default Sidebar;
