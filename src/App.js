import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import PatientLayout from "./layouts/PatientLayout";
import PublicLayout from "./layouts/PublicLayout";

// Admin Pages
import AdminLogin from "./pages/Logiin"; // admin login
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientRegistrationPage from "./pages/PatientRegistrationPage";
import PatientsListPage from "./pages/PatientsListPage";
import PatientMedicalHistory from "./components/PatientMedicalRecord";
import AdminSettings from "./pages/Settings";
import AdminNotifications from "./pages/Notifications";

// Patient Pages
import PatientLogin from "./pages/PatientLogin";
import PatientProfile from "./pages/PatientProfile";
import PatientSettings from "./pages/PatientSettings";
import PatientNotifications from "./pages/PatientNotifications";
import MedicalHistory from "./pages/MedicalHistory";
import PatientDashboard from "./components/PatientDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* -------------------- PUBLIC ROUTES -------------------- */}
        <Route
          path="/admin/login"
          element={
            <PublicLayout>
              <AdminLogin />
            </PublicLayout>
          }
        />
        <Route
          path="/patient/login"
          element={
            <PublicLayout>
              <PatientLogin />
            </PublicLayout>
          }
        />

        {/* -------------------- ADMIN ROUTES -------------------- */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
              </AdminLayout>
          }
        />
        <Route
          path="/admin/patients"
          element={
            <AdminLayout>
              <Patients />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/patients/registration"
          element={
            <AdminLayout>
              <PatientRegistrationPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/patients/list"
          element={
            <AdminLayout>
              <PatientsListPage />
            </AdminLayout>
          }
        />
        <Route
         path="/admin/patients/medicalhistory"
         element={
          <AdminLayout>
            <PatientMedicalHistory />
          </AdminLayout>
         }
         />
        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <AdminLayout>
              <AdminNotifications />
            </AdminLayout>
          }
        />

        {/* -------------------- PATIENT ROUTES -------------------- */}
        <Route
          path="/patient/login"
          element={
            <PublicLayout>
              <PatientLogin />
            </PublicLayout>
          }
        />

           <Route
          path="/patient/dashboard"
          element={
           <PatientDashboard />
          }
        />

        <Route
          path="/patient/profile"
          element={
            <PatientLayout>
              <PatientProfile />
            </PatientLayout>
          }
        />
        <Route
          path="/patient/notifications"
          element={
            <PatientLayout>
              <PatientNotifications />
            </PatientLayout>
          }
        />
        <Route
          path="/patient/MedicalHistory"
          element={
            <PatientLayout>
              <MedicalHistory />
            </PatientLayout>
          }
        />
        <Route
          path="/patient/settings"
          element={
            <PatientLayout>
              <PatientSettings />
            </PatientLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
