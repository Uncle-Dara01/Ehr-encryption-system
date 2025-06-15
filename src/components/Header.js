import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <h2 className="text-xl font-semibold">Administrator Dashboard</h2>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded-md"
        />
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;
