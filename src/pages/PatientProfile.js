import React, { useEffect, useState } from "react";

const PatientProfile = () => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("patientProfileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const patient = {
    name: "John Doe",
    email: "johndoe@example.com",
    gender: "Male",
    dob: "1992-03-15",
    phone: "(123) 456-7890",
    address: "123 Main St, Springfield",
    bloodType: "O+",
  };

  return (
    <div className="max-w-md mx-auto">
    
        <header>
          <hi>WELLCOME BACK!!!!</hi></header>
      <h1 className="text-2xl font-bold mb-6 text-center">Patient Profile</h1>

      {/* Profile Image */}
      <div className="flex justify-left mb-4">
        <img
          src={profileImage || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-2"
        />
      </div>

      {/* Patient Info */}
      <div className="bg-white dark:bg-white-800 p-4 rounded shadow">
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Date of Birth:</strong> {patient.dob}</p>
        <p><strong>Blood Type:</strong> {patient.bloodType}</p>
        <p><strong>Address:</strong> {patient.address}</p>
      </div>
    </div>
  );
};

export default PatientProfile;
