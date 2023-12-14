import React from "react";
import PatientHomeCard from "../Patient/PatientHomeCard";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import { Container, Row } from "react-bootstrap";
import PharmImg from "../../components/Pharmacist/PharmImg";
import PhHamburgerMenu from "../../components/Pharmacist/PhHamburgerMenu";
import { faBriefcaseMedical } from "@fortawesome/free-solid-svg-icons";
import ChatPat from "../../components/ChatPat";
import NotificationsPanel from "../../components/NotificationsPanel";

export default function PharmTest() {
  return (
    <>
      <AppNavbar hamburgerMenu={<PhHamburgerMenu />} />
      <Container>
        <NotificationsPanel/>
      </Container>
      <ChatPat who="pharmacist" />

    </>
  );
}
