import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const observers = useRef({});

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4040/patient/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatient(res.data.patient[0]);
      } catch (err) {
        console.error("Profile error:", err);
        navigate("/patient/login");
      }
    };

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4040/patient/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.notifications?.filter(n => !n.is_read).length || 0);
      } catch (err) {
        console.error("Notifications error:", err);
      }
    };

    fetchPatient();
    fetchNotifications();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/patient/login");
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:4040/patient/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Mark as read failed:", err);
    }
  };

  const token = localStorage.getItem("token");
  if (!token) return <p className="text-center mb-5">Please wait...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-red-700">
            Welcome{patient ? `, ${patient.firstname}` : ""} 👋
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <Link to="/patient/profile" className="bg-white border p-5 rounded shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-gray-800">Profile</h3>
            <p className="text-sm text-gray-500">View your personal details</p>
          </Link>

          <Link to="/patient/medicalhistory" className="bg-white border p-5 rounded shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-gray-800">Medical History</h3>
            <p className="text-sm text-gray-500">Request your encrypted records and decrypt records</p>
          </Link>

          <Link to="/patient/notifications" className="bg-white border p-5 rounded shadow hover:shadow-md transition relative">
            <h3 className="font-semibold text-lg text-gray-800 flex items-center">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-500">See your updates</p>
          </Link>

          <Link to="/patient/settings" className="bg-white border p-5 rounded shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-gray-800">Settings</h3>
            <p className="text-sm text-gray-500">Manage your account</p>
          </Link>
        </div>

        {/* Recent Notifications */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-gray-500">No notifications yet.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.slice(0, 5).map((note) => (
                <li
                  key={note.id}
                  ref={(el) => {
                    if (el && !note.is_read && !observers.current[note.id]) {
                      const observer = new IntersectionObserver(([entry]) => {
                        if (entry.isIntersecting) {
                          markAsRead(note.id);
                          observer.disconnect();
                          delete observers.current[note.id];
                        }
                      }, { threshold: 0.5 });
                      observer.observe(el);
                      observers.current[note.id] = observer;
                    }
                  }}
                  className={`p-4 rounded border shadow-sm ${
                    note.is_read ? "bg-white" : "bg-yellow-50 border-yellow-300"
                  }`}
                >
                  <p className="text-gray-700">{note.message}</p>
                  <p className="text-sm text-gray-500">{note.date} at {note.time}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
          <Footer />
    </div>

  );
};

export default PatientDashboard;