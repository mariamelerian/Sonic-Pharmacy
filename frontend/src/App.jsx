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

import PatientMyOrdersPage from "./pages/Patient/PatientMyOrdersPage";
import AdminProfilePage from "./pages/Admin/AdminProfilePage";
import PatientProfile from "./pages/Patient/PatientProfile";
import PharmacistProfile from "./pages/Pharmacist/PharmacistProfile";

import MedicineInCart from "./components/Patient/PatientMedicineInCart";
import PatientExistingAddress from "./components/Patient/PatientExistingAddress";
import CartItems from "./components/Patient/PatientMedicineInCart";
// import PatientCheckOutModal from "./components/Patient/PatientCheckOutModal";
import ForgotPassword from "./pages/Guest/ForgotPassword";

import OTPVerification from "./pages/Guest/OTPVerification";
import ResetPassword from "./pages/Guest/ResetPassword";
import PasswordChanged from "./pages/Guest/PasswordChanged";
import CheckOutDoneModal from "./components/Patient/PatientCheckOutDoneModal";
import PatientShowMedicine from "./components/Patient/PatientShowMedicine";
<<<<<<< Updated upstream
import PatientChatWithPharmacist from "./pages/Patient/PatientChatWithPharmacist";
//import ChatPat from "./components/ChatPat";
import AdminSalesReportPage from "./pages/Admin/AdminSalesReportPage";
import PharmacistSalesReportPage from "./pages/Pharmacist/PharmacistSalesReportPage";
=======
import ChatPat from "./components/ChatPat";
  
>>>>>>> Stashed changes

//import AddMedicineModal from "./components/Pharmacist/PhNewMedicineModal";

function App() {
  return (
    <div className="bg-light">
      <Routes>
        <Route path="/" element={<GuestHomePage />} />

        <Route path="login">
          <Route index element={<Login />} />
        </Route>

        <Route path="forgot-password">
          <Route path="otp-verification" element={<OTPVerification />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="password-changed" element={<PasswordChanged />} />
          <Route index element={<ForgotPassword />} />
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

        <Route path="forgot-password">
          {/* <Route path="otp-verification" element={<OTPVerification />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="password-changed" element={<PasswordChanged />} /> */}
          <Route index element={<ForgotPassword />} />
        </Route>

        <Route path="admin">
          <Route index element={<AdminHomePage />} />
          <Route path="pharmacists-list" element={<AdminPharmacistPage />} />
          <Route path="patients-list" element={<AdminPatientsPage />} />
          <Route path="admins-list" element={<AdminAdminsPage />} />
          <Route path="admin-medicine" element={<AdminMedicine />} />
          <Route path="admin-salesreport" element={<AdminSalesReportPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
        </Route>

        <Route path="Patient">
          {/* <Route index element={<PatientHomePage />} /> */}
          <Route index element={<PatientMedicine />}/>
          <Route path="patient-medicine" element={<PatientMedicine />} />
          {/* <Route path="patient-medicine" element={<FilterMedicine />} /> */}
          <Route path="patient-cart" element={<PatientCart />} />

          <Route path="patient-cartItem" element={<CartItems />} />
          {/* <Route path="patient-checkout" element={<PatientCheckOutModal />} /> */}
<<<<<<< Updated upstream
          <Route
            path="patient-checkoutcomplete"
            element={<CheckOutDoneModal />}
          />
          <Route
            path="patient-chatwithpharmacist"
            element={<PatientChatWithPharmacist />}
          />
=======
          <Route path="patient-checkoutcomplete" element={<CheckOutDoneModal />} />
          {/* <Route path="patient-chatwithpharmacist" element={<PatientChatWithPharmacist />} /> */}
          <Route path="patient-chatwithpharmacist" element={<ChatPat />} />
          
          
>>>>>>> Stashed changes

          <Route path="patient-myOrders" element={<PatientMyOrdersPage />} />
          <Route path="profile" element={<PatientProfile />} />
        </Route>

        <Route path="Pharmacist">
          {/* <Route index element={<PharmacistHomePage />} /> */}
          <Route index element={<PhMedicine />} />

          <Route path="ph-medicine" element={<PhMedicine />} />
          {/* <Route path="ph-medicine" element={<ChatPat />} /> */}

          <Route path="pharmacist-profile" element={<PharmacistProfile />} />
          <Route
            path="ph-salesreport"
            element={<PharmacistSalesReportPage />}
          />
        </Route>

        <Route path="*" element={<>Page not found</>} />
      </Routes>
    </div>
  );
}

export default App;
