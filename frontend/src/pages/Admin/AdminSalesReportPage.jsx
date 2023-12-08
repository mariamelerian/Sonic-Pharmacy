import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import HamburgerMenu from "../../components/Admin/AdminBurgerMenu";
import FilterByMonth from "../../components/FilterByMonth";
import ShowSalesReport from "../../components/ShowSalesReport";

function AdminSalesReportPage() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<HamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4">
          <Row>
            <Col xs={12} md={12}>
              <FilterByMonth />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <ShowSalesReport />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default AdminSalesReportPage;
