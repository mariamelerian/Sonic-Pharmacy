import React from "react";
import { Container, Row } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import PhHamburgerMenu from "../../components/Pharmacist/PhHamburgerMenu";
import PhMedicineSales from "../../components/Pharmacist/PhMedicineSales";

function PhSales() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<PhHamburgerMenu />} />
      <div
        style={{
          marginTop: "50px",
          color: "var(--body-text-body-color, #212529)",
          fontSize: "2rem",
          fontWeight: "600",
          textAlign: "center",
          lineHeight: "120%",
        }}
      >
        Medicine Sales
      </div>
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4 d-flex align-items-center justify-content-center">
          <div className="justify-content-center">
            <PhMedicineSales />
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default PhSales;
