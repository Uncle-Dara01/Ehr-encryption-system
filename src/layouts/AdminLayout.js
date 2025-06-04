import React from "react";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen dark:bg-gray-900 dark:text-white">
      <Sidebar />
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
};


export default AdminLayout;
