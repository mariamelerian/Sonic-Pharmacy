import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import ShowSalesReport from "../../components/ShowSalesReport";
import PhHamburgerMenu from "../../components/Pharmacist/PhHamburgerMenu";
import FilterForTotalSalesParm from "../../components/FilterForTotalSalesPharm";
import SalesReportPage from "../../components/SalesReport";

function PharmacistSalesReportPage() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<PhHamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4">
          <SalesReportPage />
        </Container>
      </Container>
    </div>
  );
}

export default PharmacistSalesReportPage;
