import React from "react";

const dummyData = [
  {
    id: 1,
    patient: "John Doe",
    method: "Email",
    date: "2025-05-19",
    time: "10:32 AM",
  },
  {
    id: 2,
    patient: "Jane Smith",
    method: "Portal",
    date: "2025-05-18",
    time: "4:20 PM",
  },
];

const Notifications = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Patient</th>
            <th className="p-2">Sent Via</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((n) => (
            <tr key={n.id} className="border-t">
              <td className="p-2">{n.patient}</td>
              <td className="p-2">{n.method}</td>
              <td className="p-2">{n.date}</td>
              <td className="p-2">{n.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notifications;
