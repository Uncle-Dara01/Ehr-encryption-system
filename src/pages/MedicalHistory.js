import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PatientDecryptRecord from "../components/PatientDecryptRecord";

const MedicalHistory = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);
  const [message, setMessage] = useState("Request Encrypted Medical History");
  const navigate = useNavigate();
  // const patient_id = "PAT-VakDU1";

  useEffect(() => {
    const checkedAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/patient/login");
      } else {
        setChecked(true);
      }
    };

    checkedAuth();
  }, [navigate]);

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Processing your request...");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:4040/patient/request-history",{
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
    );

      if (response.data.success) {
        setRequested(true);
        setMessage(response.data.message || "Request submitted successfully. Check your email.");
      } else {
        setMessage(response.data.message || "Request failed.");
      }
    } catch (error) {
      console.error("Request error:", error);
        setMessage(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (!checked) {
    return <p className="text-center mt-8 text-gray-600">Checking authentication, please wait...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-red-600">Medical Records Access</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Request Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Request History</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Your medical history is encrypted. Request a secure copy to be sent to your registered email.
          </p>

          <button
            onClick={handleRequest}
            disabled={requested || loading}
            className={`w-full py-2 px-4 rounded text-white font-medium transition ${
              requested || loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Please wait..." : message}
          </button>
        </div>

        {/* Decrypt Upload Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <PatientDecryptRecord />
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;