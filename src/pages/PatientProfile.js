import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientProfile = () => {
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    const fetchPatientBio = async()=>{
      try{
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4040/patient/profile", {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        if(res.data && res.status === 200){
          setPatient(res.data.patient);
        }
      }catch(error){
        console.error(error)
      }
    }
    fetchPatientBio();
  }, []);

  return (
    <div className="max-w-md mx-auto">
    
        <header>
          <h1>WELLCOME BACK!!!!</h1></header>
      <h1 className="text-2xl font-bold mb-6 text-center">Patient Profile</h1>


      {/* Patient Info */}
      <div className="bg-white dark:bg-white-800 p-4 rounded shadow">
        {patient.map((p) => (
          <div key={p.patient_id}>
        <p><strong>Name:</strong> {`${p.lastname} ${p.firstname} ${p.middlename}`}</p>
        <p><strong>Email:</strong> {p.email}</p>
        <p><strong>Phone:</strong> {p.phone_number}</p>
        <p><strong>Gender:</strong> {p.gender}</p>
        <p><strong>Date of Birth:</strong> {new Date(p.dob).toLocaleDateString()}</p>
        <p><strong>Blood Type:</strong> {p.blood_type}</p>
        <p><strong>Address:</strong> {p.address}</p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default PatientProfile;
