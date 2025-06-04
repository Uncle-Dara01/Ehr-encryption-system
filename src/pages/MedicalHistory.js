import React, { useState } from "react";

const MedicalHistory = () => {
  const [requested, setRequested] = useState(false);

  const handleRequest = () => {
    setRequested(true);

    setTimeout(() => {
      alert("Your encrypted medical history has been sent to your email.");
    }, 1000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Medical History Access</h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          For your privacy and security, your medical history is stored in encrypted format and cannot be viewed directly here. If you would like access to your medical records, you can request a secure copy to be sent to your registered email address.
        </p>

        {!requested ? (
          <button
            onClick={handleRequest}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-pink-500"
          >
            Request Encrypted Medical History
          </button>
        ) : (
          <p className="text-green-600 mt-2">
            Request submitted. Check your email shortly.
          </p>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
