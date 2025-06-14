import React, { useState } from "react";
import axios from "axios";

const PatientRegistration = () => {
   const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [middlename, setOtherName] = useState("");
    const [gender, setGender] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [blood_type, setBloodType] = useState("");
    const [address, setAddress] = useState("");
    const [next_of_kin_name, setNextOfKinName] = useState("");
    const [next_of_kin_number, setNextOfKinNumber] = useState("");
    const [relationship_with_next_of_kin, setRelationship] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    try{
      const res = await axios.post('http://localhost:4040/admin/add_patient', {
        email, firstname, lastname, middlename, gender, phone_number, dob, blood_type, address,
        next_of_kin_name, next_of_kin_number, relationship_with_next_of_kin
      });

      if(res.data && res.data.message){
        alert(res.data.message);
      }

    }catch(error){
      console.error("Patient Registration failed:", error.response?.data?.error || error.message);
      alert(error.response?.data?.message || "Patient Registration failed")

    }finally{
      setLoading(false)
    }

  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800">Patient Registration</h2>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Personal Details */}
          <section>
            <h3 className="text-xl font-medium mb-4 text-gray-700">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium">First Name</label>
                <input
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="John"
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Last Name</label>
                <input
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Doe"
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Other Name</label>
                <input
                  value={middlename}
                  onChange={(e) => setOtherName(e.target.value)}
                  type="text"
                  name="middlename"
                  placeholder=""
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Gender</label>
                <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                 className="w-full border px-4 py-2 rounded-md">
                  <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Date of Birth</label>
                <input
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  type="date"
                  className="w-full border px-4 py-2 rounded-md" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Phone Number</label>
                <input
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="tel"
                  placeholder="(123) 456-7890"
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>

              <div>
             <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full border px-4 py-2 rounded-md"/>
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium">Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="123 Main St, City"
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>
            </div>
          </section>

          {/* Next of Kin */}
          <section>
            <h3 className="text-xl font-medium mb-4 text-gray-700">Next of Kin</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium">Name</label>
                <input
                  value={next_of_kin_name}
                  onChange={(e) => setNextOfKinName(e.target.value)}
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Relationship</label>
                <input
                  value={relationship_with_next_of_kin}
                  onChange={(e) => setRelationship(e.target.value)}
                  type="text"
                  placeholder="Spouse"
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium">Phone Number</label>
                <input
                  value={next_of_kin_number}
                  onChange={(e) => setNextOfKinNumber(e.target.value)}
                  type="tel"
                  placeholder="(123) 456-7899"
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>
            </div>
          </section>

          {/* Medical Info */}
          <section>
            <h3 className="text-xl font-medium mb-4 text-gray-700">Medical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium">Blood Type</label>
                <select 
                value={blood_type}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full border px-4 py-2 rounded-md">
                  <option>Select</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>
            
            </div>
          </section>

          {/* Submit */}
          <div className="text-right">
            <button
            disabled={loading}
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              {loading ? "Registering patient...": "Register Patient" }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
