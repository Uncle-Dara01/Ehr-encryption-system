import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import PatientRegistration from "../components/PatientRegistration";
const PatientRegistrationPage = () => {

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
      <PatientRegistration />
    </div>
  );
};

export default PatientRegistrationPage;
