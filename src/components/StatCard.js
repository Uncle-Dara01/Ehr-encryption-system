import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="text-gray-500 text-sm">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
