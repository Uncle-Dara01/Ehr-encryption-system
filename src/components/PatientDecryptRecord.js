import React, { useState } from "react";
import axios from "axios";

const PatientDecryptRecord = () => {
  const [formData, setFormData] = useState({
    pdf: null,
    patient_id: "",
    passphrase: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdf") {
      setFormData((prev) => ({ ...prev, pdf: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const data = new FormData();
    data.append("pdf", formData.pdf);
    data.append("passphrase", formData.passphrase);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:4040/patient/decrypt-upload", data, {
         headers:{
            Authorization: `Bearer ${token}`
         }
      });
      setMessage(res.data.message || "Decryption successful. Check your email.");
    } catch (err) {
      const msg =
        err.response?.data?.message || "An error occurred while processing the request.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-600">Decrypt Medical Records</h2>

        <div>
          <label className="block font-medium text-gray-700">PDF File</label>
          <input
            type="file"
            name="pdf"
            accept=".pdf"
            required
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Passphrase</label>
          <input
            type="password"
            name="passphrase"
            value={formData.passphrase}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Decrypting..." : "Decrypt Records"}
        </button>

        {message && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-sm font-medium">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm font-medium">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default PatientDecryptRecord;
