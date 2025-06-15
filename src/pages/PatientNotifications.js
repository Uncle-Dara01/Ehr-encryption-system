import React, { useEffect, useState } from "react";
import axios from "axios";
import NotificationItem from "../components/NotificationItem";
import { useNavigate } from "react-router-dom";

  const PatientNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
    
      
      useEffect(()=>{
        const checkedAuth = async()=>{
          try{
            const token = localStorage.getItem("token");
    
            if(!token){
              return navigate("/patient/login");
            }else{
              setChecked(true);
            }
           } catch(error){
            console.error(error);
            navigate("/patient/login");
          }
        };
    
        checkedAuth();
      }, [navigate]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4040/patient/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data.notifications || []);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkedAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };
  
    if(!checked) return <p className="text-center mt-5">Checking Authentication..</p>

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <ul className="space-y-4">
        {notifications.map((note) => (
          <NotificationItem
            key={note.id}
            note={note}
            onMarkedAsRead={handleMarkedAsRead}
          />
        ))}
      </ul>
    </div>
  );
};

export default PatientNotifications;
