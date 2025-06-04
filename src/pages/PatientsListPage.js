import React, { useState } from "react";
import PatientList from "../components/PatientList"; // You should already have this component

const PatientsListPage = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: "Jane Doe" },
    { id: 2, name: "John Smith" }
  ]);

  const updatePatient = (id, name) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  const deletePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Patients List</h2>
      <PatientList
        patients={patients}
        updatePatient={updatePatient}
        deletePatient={deletePatient}
      />
    </div>
  );
};

export default PatientsListPage;
