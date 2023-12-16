import React, { useState } from "react";
import { Container, Tab, Col, Row, Nav } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import PhHamburgerMenu from "../../components/Pharmacist/PhHamburgerMenu";
import PharmacistProfileBox from "../../components/Pharmacist/PharmacistProfileBox";
import ChatPat from "../../components/ChatPat";

function PharmacistProfile() {
  const [activeKey, setActiveKey] = useState("first");
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  const handleRefresh = () => {
    setRefreshFlag(!refreshFlag); // Toggle the refreshFlag to trigger a refresh
  };
  return (
    <div>
      <AppNavbar hamburgerMenu={<PhHamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white py-4 d-flex align-items-center justify-content-center">
          <div>
            <PharmacistProfileBox />
          </div>
        </Container>
      </Container>
      <ChatPat who="pharmacist" />
    </div>
  );
}

export default PharmacistProfile;
