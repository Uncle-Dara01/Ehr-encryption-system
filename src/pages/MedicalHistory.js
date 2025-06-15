import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MedicalHistory = () => {
  const [checked, setChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("request");

  const [loadingRequest, setLoadingRequest] = useState(false);
  const [requested, setRequested] = useState(false);
  const [requestMsg, setRequestMsg] = useState("Request Encrypted Medical History");

  const [decryptForm, setDecryptForm] = useState({ pdf: null, passphrase: "" });
  const [decryptLoading, setDecryptLoading] = useState(false);
  const [decryptMsg, setDecryptMsg] = useState("");
  const [decryptError, setDecryptError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/patient/login");
    } else {
      setChecked(true);
    }
  }, [navigate]);

  const handleRequest = async () => {
    setLoadingRequest(true);
    setRequestMsg("Processing request...");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:4040/patient/request-history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setRequested(true);
        setRequestMsg(response.data.message || "Request submitted successfully.");
      } else {
        setRequestMsg(response.data.message || "Request failed.");
      }
    } catch (error) {
      setRequestMsg(error.response?.data?.message || "Failed to submit request.");
    } finally {
      setLoadingRequest(false);
    }
  };

  const handleDecryptChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdf") {
      setDecryptForm((prev) => ({ ...prev, pdf: files[0] }));
    } else {
      setDecryptForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDecryptSubmit = async (e) => {
    e.preventDefault();
    setDecryptLoading(true);
    setDecryptMsg("");
    setDecryptError("");

    const data = new FormData();
    data.append("pdf", decryptForm.pdf);
    data.append("passphrase", decryptForm.passphrase);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:4040/patient/decrypt-upload", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDecryptMsg(res.data.message || "Decryption successful. Check your email.");
    } catch (err) {
      const msg =
        err.response?.data?.message || "An error occurred while processing the request.";
      setDecryptError(msg);
    } finally {
      setDecryptLoading(false);
    }
  };

  if (!checked) {
    return <p className="text-center mt-10 text-gray-500">Checking authentication...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Medical Records</h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("request")}
          className={`px-4 py-2 rounded font-medium transition ${
            activeTab === "request"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Request Records
        </button>
        <button
          onClick={() => setActiveTab("decrypt")}
          className={`px-4 py-2 rounded font-medium transition ${
            activeTab === "decrypt"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Decrypt Records
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "request" && (
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Request Encrypted Records</h3>
          <p className="text-gray-600">
            Your records are securely encrypted. Request a PDF to be sent to your registered email.
          </p>

          <button
            onClick={handleRequest}
            disabled={requested || loadingRequest}
            className={`w-full py-2 px-4 rounded text-white font-medium transition ${
              requested || loadingRequest
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loadingRequest ? "Please wait..." : requestMsg}
          </button>
        </div>
      )}

      {activeTab === "decrypt" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Decrypt Medical Records</h3>
          <form onSubmit={handleDecryptSubmit} className="space-y-4" encType="multipart/form-data">
            <div>
              <label className="block font-medium text-gray-700">PDF File</label>
              <input
                type="file"
                name="pdf"
                accept=".pdf"
                required
                onChange={handleDecryptChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Passphrase</label>
              <input
                type="password"
                name="passphrase"
                value={decryptForm.passphrase}
                onChange={handleDecryptChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <button
              type="submit"
              disabled={decryptLoading}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              {decryptLoading ? "Decrypting..." : "Decrypt Records"}
            </button>

            {decryptMsg && (
              <div className="p-3 bg-green-100 text-green-700 rounded text-sm font-medium">
                {decryptMsg}
              </div>
            )}
            {decryptError && (
              <div className="p-3 bg-red-100 text-red-700 rounded text-sm font-medium">
                {decryptError}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;