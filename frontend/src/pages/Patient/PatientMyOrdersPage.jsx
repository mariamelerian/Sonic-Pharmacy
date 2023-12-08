import React, { useState } from "react";
import AdminViewTable from "../../components/Admin/AdminViewTable";
import AdminSearchBar from "../../components/Admin/AdminSearchBar";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PatientMyOrders from "../../components/Patient/PatientMyOrders";
import PatientHamburgerMenu from "../../components/Patient/PatientHamburgerMenu";
import ChatPat from "../../components/ChatPat";


export default function PatientMyOrdersPage() {



  return (
    <>
      <AppNavbar hamburgerMenu={<PatientHamburgerMenu />} />
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
        My Orders
      </div>
      <style>
        {`
          /* Custom CSS for inactive tabs */
          .nav-link {
            color: #099BA0  ; /* Set the color for inactive tabs */
          }
        `}
      </style>
          <Container
            className="bg-white px-5 py-4 d-flex align-items-center justify-content-center"
            style={{
              margin: "20px",
              display: "flex",
              flexDirection: "column",
              marginLeft: "100px",
            }}
          >

          
            <PatientMyOrders />
          
          </Container>
          <ChatPat who="patient" />

    </>
  );
}
