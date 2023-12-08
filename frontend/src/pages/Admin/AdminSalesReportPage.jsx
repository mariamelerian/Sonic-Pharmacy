import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import HamburgerMenu from "../../components/Admin/AdminBurgerMenu";
import FilterByMonth from "../../components/FilterByMonth";
import ShowSalesReport from "../../components/ShowSalesReport";
import SalesReportPage from "../../components/SalesReport";

function AdminSalesReportPage() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<HamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4">
          <SalesReportPage />
        </Container>
      </Container>
    </div>
  );
}

export default AdminSalesReportPage;
