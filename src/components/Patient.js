import React from "react";
import { FaUserPlus, FaList } from "react-icons/fa";
import { Link } from "react-router-dom";

const Patient = () => {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Patient Section</h1>

      <Link to="/admin/PatientRegistration" className="block">
  <div className="cursor-pointer flex items-center gap-4 bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow">
    <FaUserPlus className="text-3xl text-blue-700" />
    <span className="text-lg font-semibold text-blue-800">Patient Registration</span>
  </div>
</Link>

        <Link to="/admin/PatientsList" className="block">
  <div className="cursor-pointer flex items-center gap-4 bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow">
    <FaUserPlus className="text-3xl text-blue-700" />
    <span className="text-lg font-semibold text-blue-800">Patient Registration</span>
  </div>
</Link>

      <Link to="/admin/PatientsList" className="block">
  <div className="cursor-pointer flex items-center gap-4 bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow">
    <FaUserPlus className="text-3xl text-blue-700" />
    <span className="text-lg font-semibold text-blue-800">Patient Medical Record</span>
  </div>
</Link>

      </div>
  );
};

export default Patient;
