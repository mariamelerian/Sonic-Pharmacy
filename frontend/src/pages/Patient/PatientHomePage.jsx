import React from "react";
import PatientHomeCard from "./PatientHomeCard";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import { Container, Row } from "react-bootstrap";
import PatientImg from "../../components/Patient/PatientImg";
import PatientHamburgerMenu from "../../components/Patient/PatientHamburgerMenu";
import { faBriefcaseMedical } from "@fortawesome/free-solid-svg-icons";
export default function PatientHomePage() {
  return (
    <>
      <AppNavbar hamburgerMenu={<PatientHamburgerMenu />} />
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
            location="/patient/patient-medicine"
            cardText="Medicines"
            cardDetails="Show All Medicines"
            icon={faBriefcaseMedical}
          />
        </div>
      </Container>
    </>
  );
}
