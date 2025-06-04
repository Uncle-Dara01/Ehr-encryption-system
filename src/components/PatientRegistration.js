import React from "react";

const PatientRegistration = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800">Patient Registration</h2>

        {/* Personal Details */}
        <form className="space-y-8">
          <section>
            <h3 className="text-xl font-medium mb-4 text-gray-700">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium">First Name</label>
                <input type="text" placeholder="John" className="w-full border px-4 py-2 rounded-md" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full border px-4 py-2 rounded-md" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Gender</label>
                <select className="w-full border px-4 py-2 rounded-md">
                  <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Date of Birth</label>
                <input type="date" className="w-full border px-4 py-2 rounded-md" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Phone Number</label>
                <input type="tel" placeholder="(123) 456-7890" className="w-full border px-4 py-2 rounded-md" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input type="email" placeholder="email@example.com" className="w-full border px-4 py-2 rounded-md" />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium">Address</label>
                <input type="text" placeholder="123 Main St, City" className="w-full border px-4 py-2 rounded-md" />
              </div>
            </div>
          </section>

          {/* Next of Kin */}
          <section>
            <h3 className="text-xl font-medium mb-4 text-gray-700">Next of Kin</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium">Name</label>
                <input type="text" placeholder="Jane Doe" className="w-full border px-4 py-2 rounded-md" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Relationship</label>
                <input type="text" placeholder="Spouse" className="w-full border px-4 py-2 rounded-md" />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium">Phone Number</label>
                <input type="tel" placeholder="(123) 456-7899" className="w-full border px-4 py-2 rounded-md" />
              </div>
            </div>
          </section>

          {/* Medical Info */}
          <section>
            <h3 className="text-xl font-medium mb-4 text-gray-700">Medical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium">Blood Type</label>
                <select className="w-full border px-4 py-2 rounded-md">
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
              <div>
                <label className="block mb-1 text-sm font-medium">Allergies</label>
                <input type="text" placeholder="Penicillin, Nuts" className="w-full border px-4 py-2 rounded-md" />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium">Current Medications</label>
                <textarea className="w-full border px-4 py-2 rounded-md" placeholder="List medications..."></textarea>
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Register Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
