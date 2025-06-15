import Header from "../components/Header";
import StatCard from "../components/StatCard";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [history, setHistory] = useState([]);
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
  },[navigate]);

     useEffect(()=>{
    const fetchRequestHistory = async () =>{
      try{
        const token = localStorage.getItem("adminToken");
        const response = await axios.get('http://localhost:4040/admin/request-history', {
          headers:{
            Authorization: `Bearer ${token}`,
          }, });
        if(response.status === 200){
          setHistory(response.data.history);
        }
      }catch(err){
        console.error(err);
      }
    };
    fetchRequestHistory();
  },[navigate]);


  if(!checked) return <p className="text-center mt-5">Checking Authentication..</p>
  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Patients" value={patients.length} icon="👥" />
          <StatCard title="Total Administrators" value="1" icon="👥" />
          <StatCard title="Total Requests" value={history.length} icon="⏳" />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
