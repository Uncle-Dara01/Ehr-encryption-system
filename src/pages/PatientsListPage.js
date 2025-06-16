import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

// Calculate pagination
const indexOfLast = currentPage * patientsPerPage;
const indexOfFirst = indexOfLast - patientsPerPage;
const currentPatients = filteredPatients.slice(indexOfFirst, indexOfLast);
const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);


  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:4040/admin/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(res.data.patients || []);
        setFilteredPatients(res.data.patients || []);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
    fetchPatients();
  }, [token]);

  // Search filter
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = patients.filter((p) => {
      const fullName = `${p.lastname} ${p.firstname} ${p.middlename}`.toLowerCase();
      return (
        fullName.includes(query) ||
        p.email.toLowerCase().includes(query) ||
        p.phone_number.toLowerCase().includes(query)
      );
    });
    setFilteredPatients(filtered);
  }, [searchQuery, patients]);

  const startEdit = (patient) => {
    setEditing(patient.patient_id);
    setFormData({ ...patient });
    setMessage("");
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:4040/admin/patients/${formData.patient_id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message || "Patient updated successfully");
      setEditing(null);

      const updatedPatients = patients.map((p) =>
        p.patient_id === formData.patient_id ? formData : p
      );
      setPatients(updatedPatients);
    } catch (err) {
      console.error("Update failed:", err);
      setMessage(err.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  setCurrentPage(1); // reset page on new search
}, [searchQuery]);


  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-700">Manage Patients</h2>

      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, email, or phone..."
          className="w-full md:w-1/2 px-4 py-2 border rounded shadow-sm"
        />
      </div>

      {message && (
        <div className="mb-4 text-sm text-green-700 bg-green-100 p-2 rounded">
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border rounded shadow text-sm">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-2 text-left">Patient ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.map((p) => (
              <tr key={p.patient_id} className="border-b">
                <td className="p-2">{p.patient_id}</td>
                <td className="p-2">
                  {p.lastname} {p.firstname} {p.middlename}
                </td>
                <td className="p-2">{p.email}</td>
                <td className="p-2">{p.phone_number}</td>
                <td className="p-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No matching patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
  <div className="flex justify-center mt-4 space-x-2">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-3 py-1 border rounded ${
          currentPage === i + 1 ? "bg-red-600 text-white" : "bg-white"
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}

      </div>

      {editing && (
        <div className="mt-8 bg-white p-6 rounded shadow border">
          <h3 className="text-lg font-semibold mb-4">Edit Patient</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="lastname"
              value={formData.lastname || ""}
              onChange={handleChange}
              placeholder="Last Name"
              className="border px-3 py-2 rounded"
            />
            <input
              name="firstname"
              value={formData.firstname || ""}
              onChange={handleChange}
              placeholder="First Name"
              className="border px-3 py-2 rounded"
            />
            <input
              name="middlename"
              value={formData.middlename || ""}
              onChange={handleChange}
              placeholder="Other Name"
              className="border px-3 py-2 rounded"
            />
            <input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className="border px-3 py-2 rounded"
            />
            <input
              name="phone_number"
              value={formData.phone_number || ""}
              onChange={handleChange}
              placeholder="Phone"
              className="border px-3 py-2 rounded"
            />
             <input
              name="dob"
              type="date"
              value={formData.dob || ""}
              onChange={handleChange}
              placeholder=""
              className="border px-3 py-2 rounded"
            />
              <input
              name="blood_type"
              type="text"
              value={formData.blood_type || ""}
              onChange={handleChange}
              placeholder=""
              disabled={true}
              className="border px-3 py-2 rounded"
            />
             <input
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Home Address"
              className="border px-3 py-2 rounded"
            />
             <input
              name="nextofkinname"
              value={formData.next_of_kin_name || ""}
              onChange={handleChange}
              placeholder="Next of Kin Name"
              className="border px-3 py-2 rounded"
            />
             <input
              name="nextofkinnumber"
              value={formData.next_of_kin_number || ""}
              onChange={handleChange}
              placeholder="Next of Kin Phone Number"
              className="border px-3 py-2 rounded"
            />
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagePatients;