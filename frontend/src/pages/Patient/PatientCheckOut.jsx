import React from "react";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import { Container, Button } from "react-bootstrap";
import PatientHamburgerMenu from "../../components/Patient/PatientHamburgerMenu";
import AddressRadioButtons from "../../components/Patient/PatientPickAddress";

function PatientCheckOut() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<PatientHamburgerMenu />} />
      <Container
        className="bg-white px-5 py-4 d-flex align-items-center justify-content-center"
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          marginLeft: "100px",
        }}
      ></Container>
      <Container>
        <AddressRadioButtons />
        {/* Place Order Button */}
        <div className="text-center mt-3">
          <Button variant="primary">Place Order</Button>
        </div>
      </Container>
    </div>
  );
}

export default PatientCheckOut;
