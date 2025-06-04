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
import AdminSettings from "./pages/Settings";
import AdminNotifications from "./pages/Notifications";

// Patient Pages
import PatientLogin from "./pages/PatientLogin";
import PatientProfile from "./pages/PatientProfile";
import PatientSettings from "./pages/PatientSettings";
import PatientNotifications from "./pages/PatientNotifications";
import MedicalHistory from "./pages/MedicalHistory";

function App() {
  return (
    <Router>
      <Routes>
        {/* -------------------- PUBLIC ROUTES -------------------- */}
        <Route
          path="/"
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
          path="/Dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/Patient"
          element={
            <AdminLayout>
              <Patients />
            </AdminLayout>
          }
        />
        <Route
          path="/PatientRegistration"
          element={
            <AdminLayout>
              <PatientRegistrationPage />
            </AdminLayout>
          }
        />
        <Route
          path="/PatientsList"
          element={
            <AdminLayout>
              <PatientsListPage />
            </AdminLayout>
          }
        />
        <Route
          path="/Settings"
          element={
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          }
        />
        <Route
          path="/Notifications"
          element={
            <AdminLayout>
              <AdminNotifications />
            </AdminLayout>
          }
        />

        {/* -------------------- PATIENT ROUTES -------------------- */}
        <Route
          path="/PatientLogin"
          element={
            <PublicLayout>
              <PatientLogin />
            </PublicLayout>
          }
        />
        <Route
          path="/PatientProfile"
          element={
            <PatientLayout>
              <PatientProfile />
            </PatientLayout>
          }
        />
        <Route
          path="/PatientNotifications"
          element={
            <PatientLayout>
              <PatientNotifications />
            </PatientLayout>
          }
        />
        <Route
          path="/MedicalHistory"
          element={
            <PatientLayout>
              <MedicalHistory />
            </PatientLayout>
          }
        />
        <Route
          path="/PatientSettings"
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
