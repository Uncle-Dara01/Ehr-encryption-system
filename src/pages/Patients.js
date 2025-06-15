import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Patients = () => {
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Patient Section</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="cursor-pointer flex items-center gap-4 bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow"
          onClick={() => navigate("/admin/patients/registration")}
        >
          <span className="text-lg font-semibold text-blue-800">Patient Registration</span>
        </div>

        <div
          className="cursor-pointer flex items-center gap-4 bg-green-100 hover:bg-green-200 p-6 rounded-lg shadow"
          onClick={() => navigate("/admin/patients/list")}
        >
          <span className="text-lg font-semibold text-green-800">Patients List</span>
        </div>

         <div
          className="cursor-pointer flex items-center gap-4 bg-yellow-100 hover:bg-yellow-200 p-6 rounded-lg shadow"
          onClick={() => navigate("/admin/patients/medicalhistory")}
        >
          <span className="text-lg font-semibold text-yellow-800">Patient Medical History</span>
        </div>
      </div>
    </div>
  );
};




export default Patients;
