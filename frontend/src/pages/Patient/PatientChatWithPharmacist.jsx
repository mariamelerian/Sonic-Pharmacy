import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import HamburgerMenu from "../../components/Patient/PatientHamburgerMenu";
import PatientChat from "../../components/Patient/PatientChat";

function PatientChatWithPharmacist() {
  
  return (
    <div>
      <AppNavbar hamburgerMenu={<HamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <PatientChat/>
      </Container>
    </div>
  );
}

export default PatientChatWithPharmacist;
