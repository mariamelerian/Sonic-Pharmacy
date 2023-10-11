import React from "react";
import { Container, Row } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import HamburgerMenu from "../../components/Admin/AdminBurgerMenu";
//import PhHamburgerMenu from "../../components/Pharmacist/PhHamburgerMenu";
// import PhShowAppointments from "../../components/Pharmacist/PhShowAppointments";
// import PhShowPatients from "../../components/Pharmacist/PhShowMedicine";
//import PhShowMedicines from "../../components/Pharmacist/PhShowMedicine";
import AdminShowMedicine from "../../components/Admin/AdminShowMedicine";
//import PhMedicineFilter from "../../components/Pharmacist/PhMedicineFilter";
import AdminMedicineFilter from "../../components/Admin/AdminMedicineFilter";


function AdminMedicine() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<HamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4 d-flex align-items-center justify-content-center">
        <div className="col-5">
            <AdminMedicineFilter />
          </div>
          <div className="col-7">
            <AdminShowMedicine />
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default AdminMedicine;