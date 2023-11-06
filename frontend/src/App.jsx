import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GuestHomePage from "./pages/Guest/GuestHomePage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AdminPatientsPage from "./pages/Admin/AdminPatientsPage";
import AdminPharmacistPage from "./pages/Admin/AdminPharmacistPage";
import AdminAdminsPage from "./pages/Admin/AdminAdminsPage";
import AdminMedicine from "./pages/Admin/AdminViewMedicine";
import PatientMedicine from "./pages/Patient/PatientViewMedicine";
import PhMedicine from "./pages/Pharmacist/PhViewMedicine";
import PatientHomePage from "./pages/Patient/PatientHomePage";
import PharmacistHomePage from "./pages/Pharmacist/PharmacistHomePage";
import PatientSignup from "./pages/Guest/PatientSignup";
import Login from "./pages/Guest/Login";
import PharmSignup from "./pages/Guest/PharmSignup";
import PatientCart from "./pages/Patient/PatientCart";

function App() {
  return (
    <div className="bg-light">
      <Routes>
        <Route path="/" element={<GuestHomePage />} />

        <Route path="login">
          <Route index element={<Login />} />
        </Route>

        <Route path="GuestHomePage">
          <Route index element={<GuestHomePage />} />
        </Route>

        <Route path="patient-signup">
          <Route index element={<PatientSignup />} />
        </Route>

        <Route path="pharmacist-signup">
          <Route index element={<PharmSignup />} />
        </Route>

        <Route path="admin">
          <Route index element={<AdminHomePage />} />
          <Route path="pharmacists-list" element={<AdminPharmacistPage />} />
          <Route path="patients-list" element={<AdminPatientsPage />} />
          <Route path="admins-list" element={<AdminAdminsPage />} />
          <Route path="admin-medicine" element={<AdminMedicine />} />
        </Route>

        <Route path="Patient">
          <Route index element={<PatientHomePage />} />
          <Route path="patient-medicine" element={<PatientMedicine />} />
          <Route path="patient-cart" element={<PatientCart />} />
        </Route>

        <Route path="Pharmacist">
          <Route index element={<PharmacistHomePage />} />
          <Route path="ph-medicine" element={<PhMedicine />} />
        </Route>

        <Route path="*" element={<>Page not found</>} />
      </Routes>
    </div>
  );
}

export default App;
