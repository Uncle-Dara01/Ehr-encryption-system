import React, {useState, useEffect} from "react";
import axios from "axios";

const PatientsListPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(()=>{
    const fetchPatientsData = async () =>{
      try{
        const token = localStorage.getItem("adminToken");
        const response = await axios.get('http://localhost:4040/admin/patients', {
          headers:{
            Authorization: `Bearer ${token}`,
          }, });
        if(response.status === 200){
          setPatients(response.data.patients);
        }
      }catch(err){
        console.error(err);
      }
    };
    fetchPatientsData();
  },[]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Patients List</h2>
      <ul className="space-y-2">
        {patients.map((p) => (
          <li key={p.patient_id} className="p-4 bg-white rounded shadow">
            {`${p.lastname} ${p.firstname} ${p.middlename}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientsListPage;