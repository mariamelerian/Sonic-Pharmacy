import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GuestHomePage from "./pages/Guest/GuestHomePage";
//import Login from "./pages/Guest/Login";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AdminPatientsPage from "./pages/Admin/AdminPatientsPage";
import AdminPharmacistPage from "./pages/Admin/AdminPharmacistPage";
//import AdminPackagesPage from "./pages/Admin/AdminPackagesPage";
import AdminAdminsPage from "./pages/Admin/AdminAdminsPage";
import AdminMedicine from "./pages/Admin/AdminViewMedicine";
import PatientMedicine from "./pages/Patient/PatientViewMedicine";
import PhMedicine from "./pages/Pharmacist/PhViewMedicine";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-light">
        <Routes>
          <Route path="/" element={<GuestHomePage />} />
          <Route path="GuestHomePage">
            <Route index element={<GuestHomePage />} />
          </Route>
          {/*   <Route path="login">
            <Route index element={<Login />} />
          </Route> */}

          <Route path="admin">
            <Route index element={<AdminHomePage />} />
            <Route path="pharmacists-list" element={<AdminPharmacistPage />} />
            <Route path="patients-list" element={<AdminPatientsPage />} />
            <Route path="admins-list" element={<AdminAdminsPage />} />
            <Route path="admin-medicine" element={<AdminMedicine />} />
            {/* <Route path="packages" element={<AdminPackagesPage />} /> */}
          </Route>

          <Route path="Patient">
            <Route index element={<AdminHomePage />} />

            <Route path="patient-medicine" element={<PatientMedicine />} />
            {/* <Route path="packages" element={<AdminPackagesPage />} /> */}
          </Route>

          <Route path="Pharmacist">
            <Route index element={<AdminHomePage />} />

            <Route path="ph-medicine" element={<PhMedicine />} />
            {/* <Route path="packages" element={<AdminPackagesPage />} /> */}
          </Route>

          <Route path="*" element={<>Page not found</>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
