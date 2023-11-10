import { useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import ViewPersonalInfo from "./viewPersonalInfo";
/* import { useSelector } from "react-redux"; */

function ProfileTabs() {
  const [activeKey, setActiveKey] = useState("first");
  const [refreshFlag, setRefreshFlag] = useState(false);
 /*  const wallet = useSelector((state) => state.patientLogin.wallet); */

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  const handleRefresh = () => {
    setRefreshFlag(!refreshFlag); // Toggle the refreshFlag to trigger a refresh
  };

  return (
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
                    background: activeKey === "first" ? "#05afb9" : "white",
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
              <Nav.Item>
                <Nav.Link
                  eventKey="fourth"
                  style={{
                    background: activeKey === "fourth" ? "#05afb9" : "white",
                    color: activeKey === "fourth" ? "white" : "black",
                    border:
                      activeKey === "fourth"
                        ? "none"
                        : "1px solid rgb(189, 189, 189)",
                    marginBottom: "1rem",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                  }}
                >
                  My Wallet
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col lg={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <ViewPersonalInfo />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      fontSize: "2.5rem", // Increase font size for the title
                      fontWeight: "600",
                      color: "#212529",
                      lineHeight: "1.5",
                    }}
                  >
                    My Wallet
                  </div>
                  <div
                    style={{
                      color: "#099BA0  ",
                      fontSize: "30px",
                      fontWeight: "600",
                      marginBottom: "10px",
                      marginLeft: "22rem",
                      marginTop: "3rem",
                    }}
                  >
                    {/* Balance: ${wallet} */}
                  </div>

                  {/* You can add more wallet-related content here */}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default ProfileTabs;
