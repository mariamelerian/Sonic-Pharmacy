import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import PhHamburgerMenu from "../../components/Pharmacist/PhHamburgerMenu";
import PhShowMedicines from "../../components/Pharmacist/PhShowMedicine";
import FilterMedicine from "../../components/FilterMedicine";

function PhMedicine() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<PhHamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4">
          <Row>
            <Col xs={12}>
              <FilterMedicine />
            </Col>
            <Col xs={12}>
              <PhShowMedicines />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default PhMedicine;
