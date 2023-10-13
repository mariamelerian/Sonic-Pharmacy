import React from "react";
import { Container, Row } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import HamburgerMenu from "../../components/Patient/PatientHamburgerMenu";
import PatientShowMedicine from "../../components/Patient/PatientShowMedicine";
import FilterMedicine from "../../components/FilterMedicine";

function PatientMedicine() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<HamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Row className="bg-white px-5 py-4 d-flex align-items-center justify-content-center">
          <div className="col-5">
            <FilterMedicine />
          </div>
          <div className="col-7">
            <PatientShowMedicine />
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default PatientMedicine;
