import React from "react";


const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-red-500 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">EHR System</h2>
      <nav className="flex flex-col gap-4">
        <a href="/Dashboard">Dashboard</a>
        <a href="/Patient">Patient</a>
        <a href="/Settings">Settings</a>
        <a href="/Notifications">Notifications</a>
  <button
    onClick={() => {
      localStorage.clear();
      window.location.href = "/";
    }}
    className="text-left text-white hover:underline"
  >
    Logout
  </button>

      </nav>
    </div>
  );
};


export default Sidebar;
