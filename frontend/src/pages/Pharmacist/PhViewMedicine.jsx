import React from "react";
import { Container, Row } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import PhHamburgerMenu from "../../components/Pharmacist/PhHamburgerMenu";
import PhShowMedicines from "../../components/Pharmacist/PhShowMedicine";
import PhMedicineFilter from "../../components/Pharmacist/PhMedicineFilter";


function PhMedicine() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<PhHamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4 d-flex align-items-center justify-content-center">
        <div className="col-5">
            <PhMedicineFilter />
          </div>
          <div className="col-7">
            <PhShowMedicines />
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default PhMedicine;