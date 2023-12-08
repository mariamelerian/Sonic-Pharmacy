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
        <Container className="bg-white px-5 py-4 d-flex align-items-center justify-content-center">
          <Row className="w-100">
            <div className="w-100 mt-5">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col lg={3}>
                    <Nav
                      variant="pills"
                      className="flex-column"
                      activeKey={activeKey}
                      onSelect={handleSelect}
                    >
                      <Nav.Item>
                        <Nav.Link
                          eventKey="first"
                          style={{
                            background:
                              activeKey === "first" ? "#05afb9" : "white",
                            color: activeKey === "first" ? "white" : "black",
                            border:
                              activeKey === "first"
                                ? "none"
                                : "1px solid rgb(189, 189, 189)",
                            marginBottom: "1rem",
                            fontSize: "1.2rem",
                            fontWeight: "600",
                          }}
                        >
                          Personal Information
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col lg={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <PharmacistProfileBox />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </Row>
        </Container>
      </Container>
      <ChatPat who="pharmacist" />

    </div>
  );
}

export default PharmacistProfile;
