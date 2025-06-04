import React from "react";
// import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Patients" value="1,234" icon="👥" />
          <StatCard title="Appointments Today" value="56" icon="📅" />
          <StatCard title="Pending Requests" value="12" icon="⏳" />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
