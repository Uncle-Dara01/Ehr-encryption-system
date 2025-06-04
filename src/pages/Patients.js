// import React, { useState } from "react";
// import PatientRegistration from "../components/PatientRegistration";
// import PatientList from "../components/PatientList";

import React from "react";
import { useNavigate } from "react-router-dom";
// import { FaUserPlus, FaList } from "react-icons/fa";

const Patients = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Patient Section</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="cursor-pointer flex items-center gap-4 bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow"
          onClick={() => navigate("/PatientRegistration")}
        >
          {/* <FaUserPlus className="text-3xl text-blue-700" /> */}
          <span className="text-lg font-semibold text-blue-800">Patient Registration</span>
        </div>
        <div
          className="cursor-pointer flex items-center gap-4 bg-green-100 hover:bg-green-200 p-6 rounded-lg shadow"
          onClick={() => navigate("/PatientsList")}
        >
          {/* <FaList className="text-3xl text-green-700" /> */}
          <span className="text-lg font-semibold text-green-800">Patients List</span>
        </div>
      </div>
    </div>
  );
};




export default Patients;
