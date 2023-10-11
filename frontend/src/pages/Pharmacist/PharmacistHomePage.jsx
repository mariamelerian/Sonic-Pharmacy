import React from "react";
import PatientHomeCard from "../Patient/PatientHomeCard";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import { Container, Row } from "react-bootstrap";
import PatientImg from "../../components/Patient/PatientImg";
import PhHamburgerMenu from "../../components/Pharmacist/PhHamburgerMenu";
import {
  faBriefcaseMedical,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
export default function PharmacistHomePage() {
  return (
    <>
      <AppNavbar hamburgerMenu={<PhHamburgerMenu />} />
      <Container
        className="bg-white px-5 py-4 d-flex align-items-center justify-content-center"
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          marginLeft: "100px",
        }}
      >
        <Row className="row-sub-container">
          <PatientImg />
        </Row>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <PatientHomeCard
            location="/pharmacist/ph-medicine"
            cardText="Medicines"
            cardDetails="Show All Medicines"
            icon={faBriefcaseMedical}
          />
          <PatientHomeCard
            location="/pharmacist/ph-sales"
            cardText="Sales"
            cardDetails="Show All Sales"
            icon={faFileInvoiceDollar}
          />
        </div>
      </Container>
    </>
  );
}
