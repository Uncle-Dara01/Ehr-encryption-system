import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
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
    const fetchPatientBio = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4040/patient/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data && res.status === 200) {
          setPatient(res.data.patient[0]);
        }
      } catch (error) {
        console.error("Failed to fetch patient:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientBio();
  }, []);

    
  if(!checked) return <p className="text-center mt-5">Checking Authentication..</p>

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading patient profile...</p>;

  if (!patient) return <p className="text-center mt-10 text-red-500">Patient data not found.</p>;

  return (
    <>
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-red-700">Patient Profile</h1>

      <div className="bg-white border shadow-md rounded-lg p-6 space-y-4">
        <p><strong>Name:</strong> {`${patient.lastname} ${patient.firstname} ${patient.middlename}`}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Phone:</strong> {patient.phone_number}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Date of Birth:</strong> {new Date(patient.dob).toLocaleDateString()}</p>
        <p><strong>Blood Type:</strong> {patient.blood_type}</p>
        <p><strong>Address:</strong> {patient.address}</p>
      </div>
    </div>
    </>
  );
};

export default PatientProfile;
