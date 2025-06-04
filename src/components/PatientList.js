import React from "react";

const PatientsListPage = () => {
  const patients = [
    { id: 1, name: "Jane Doe" },
    { id: 2, name: "John Smith" }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Patients List</h2>
      <ul className="space-y-2">
        {patients.map((p) => (
          <li key={p.id} className="p-4 bg-white rounded shadow">
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientsListPage;

