import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import HamburgerMenu from "../../components/Admin/AdminBurgerMenu";
import AdminShowMedicine from "../../components/Admin/AdminShowMedicine";
import FilterMedicine from "../../components/FilterMedicine";

function AdminMedicine() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<HamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4">
          <Row>
            <Col xs={12} md={12}>
              <FilterMedicine />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <AdminShowMedicine />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default AdminMedicine;
