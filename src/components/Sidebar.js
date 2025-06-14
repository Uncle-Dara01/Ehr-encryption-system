import React from "react";
import {useNavigate} from "react-router-dom"


const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");
    navigate('/admin/login')
  }
  return (
    <div className="w-64 min-h-screen bg-red-500 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">EHR System</h2>
      <nav className="flex flex-col gap-4">
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/patient">Patient</a>
        <a href="/admin/settings">Settings</a>
        <a href="/admin/notifications">Notifications</a>
  <button
    onClick={handleLogout}
    className="text-left text-white hover:underline"
  >
    Logout
  </button>

      </nav>
    </div>
  );
};


export default Sidebar;
