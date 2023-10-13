import React from "react";
import PatientHomeCard from "../Patient/PatientHomeCard";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import { Container, Row } from "react-bootstrap";
import PharmImg from "../../components/Pharmacist/PharmImg";
import PhHamburgerMenu from "../../components/Pharmacist/PhHamburgerMenu";
import { faBriefcaseMedical } from "@fortawesome/free-solid-svg-icons";

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
          <PharmImg />
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
        </div>
      </Container>
    </>
  );
}
