import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientMedicalHistory = () => {
  const [patient_id, setPatientId] = useState("");
  const [records, setRecords] = useState([{ title: "", medical_history_text: "" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
    
      
      useEffect(()=>{
        const checkedAuth = async()=>{
          try{
            const token = localStorage.getItem("adminToken");
    
            if(!token){
              return navigate("/admin/login");
            }else{
              setChecked(true);
            }
           } catch(error){
            console.error(error);
            navigate("/admin/login");
          }
        };
    
        checkedAuth();
      }, [navigate]);
  
  if(!checked) return <p className="text-center mt-5">Checking Authentication..</p>

  const handleRecordChange = (index, field, value) => {
    const updated = [...records];
    updated[index][field] = value;
    setRecords(updated);
  };

  const addRecord = () => {
    setRecords([...records, { title: "", medical_history_text: "" }]);
  };

  const removeRecord = (index) => {
    const updated = records.filter((_, i) => i !== index);
    setRecords(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:4040/admin/add_patient_medical_history", {
        patient_id,
        records,
      });

      if (response.data?.message) {
        setMessage(response.data.message);
        setRecords([{ title: "", medical_history_text: "" }]);
        setPatientId("");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to submit records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Add Multiple Medical History Records</h2>

        {message && (
          <div className="mb-4 p-3 text-sm bg-blue-100 text-blue-800 border rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Patient ID</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={patient_id}
              onChange={(e) => setPatientId(e.target.value)}
              required
            />
          </div>

          {records.map((record, index) => (
            <div key={index} className="border p-4 rounded mb-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Record #{index + 1}</span>
                {records.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRecord(index)}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full border px-3 py-2 rounded"
                  value={record.title}
                  onChange={(e) => handleRecordChange(index, "title", e.target.value)}
                  required
                />
                <textarea
                  placeholder="Medical history text..."
                  rows={4}
                  className="w-full border px-3 py-2 rounded font-mono"
                  value={record.medical_history_text}
                  onChange={(e) => handleRecordChange(index, "medical_history_text", e.target.value)}
                  required
                />
              </div>
            </div>
          ))}

          <div className="text-right">
            <button
              type="button"
              onClick={addRecord}
              className="mb-4 text-sm text-blue-600"
            >
              + Add Another Record
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit Records"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientMedicalHistory;
