import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";

const PatientSettings = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Reset Password");
  const [submitted, setSubmitted] = useState(false);
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


  const handleResetPassword = async(e) => {
    try{
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const response = await axios.post("http://localhost:4040/patient/reset-password", {
      oldPassword, newPassword
    }, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
      if (response.status === 200) {
        setSubmitted(true);
        setMessage(response.data.message || "Password reset successfully.");
      } else {
        setMessage(response.data.message || "Password reset failed.");
      }
  }catch(error){
    console.error(error);
    setMessage(error?.response?.data?.message || "Login Failed!")
  }finally{
    setLoading(false);
  }
  };

  if(!checked) return <p className="text-center mt-5">Checking Authentication, Please Wait..</p>

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {/* Theme Toggle */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Theme</label>
        <div className="flex gap-4">
          <button
            onClick={() => setDarkMode(false)}
            className={`px-4 py-2 rounded ${!darkMode ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          >
            Light Mode
          </button>
          <button
            onClick={() => setDarkMode(true)}
            className={`px-4 py-2 rounded ${darkMode ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          >
            Dark Mode
          </button>
        </div>
      </div>

      {/* Notification Toggle */}
      <div className="mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          Enable pop-up notifications
        </label>
      </div>

      {/* Reset Password */}
      <form onSubmit={handleResetPassword} className="space-y-4">
        <h3 className="font-semibold">Reset Password</h3>
        <input
          type="password"
          placeholder="Old Password"
          className="w-full border p-2 rounded"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      <button
          onClick={handleResetPassword}
          disabled={submitted}
          className={`px-4 py-2 rounded text-white ${
            submitted ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-pink-500"}`}
        >
          {loading ? "Please wait...": message}
        </button>
      </form>
    </div>
  );
};

export default PatientSettings;
