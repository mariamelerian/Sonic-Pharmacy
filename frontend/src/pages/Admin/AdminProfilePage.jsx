import React, { useState } from "react";
import { Container, Tab, Col, Row, Nav, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import AdminBurgerMenu from "../../components/Admin/AdminBurgerMenu";
import ChangePass from "../../forms/ChangePass";

function AdminProfilePage() {
  const [activeKey, setActiveKey] = useState("first");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const user = useSelector((state) => state.adminPharmLogin);

  const listItemStyle = {
    fontSize: "1rem", // Font size for all information
    marginBottom: "0.7rem", // Margin bottom for all information
    verticalAlign: "top", // Align items at the top of each column
    fontWeight: "500", // Bold font weight for information title
  };

  const labelStyle = {
    cursor: "pointer",
    fontWeight: "lighter",
    textDecoration: showChangePass ? "underline" : "none",
    color: "inherit",
  };

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  const toggleChangePass = () => {
    setShowChangePass(!showChangePass);
  };

  return (
    <div>
      <AppNavbar hamburgerMenu={<AdminBurgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4 d-flex align-items-center justify-content-center">
          <div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                fontSize: "2.5rem",
                fontWeight: "600",
                color: "#212529",
                lineHeight: "1.5",
                marginBottom: "1rem",
              }}
            >
              Personal Information
            </div>
            <ListGroup>
              <ListGroup.Item>
                <div style={listItemStyle}>
                  <span style={{ color: "#099BA0", fontWeight: "bold" }}>
                    Username:{" "}
                  </span>
                  {user.userName}
                </div>
                <div style={listItemStyle}>
                  <span style={{ color: "#099BA0", fontWeight: "bold" }}>
                    Name:{" "}
                  </span>
                  {user.name}
                </div>
                <div style={listItemStyle}>
                  <span style={{ color: "#099BA0", fontWeight: "bold" }}>
                    Password:
                  </span>{" "}
                  <span>
                    <label
                      style={{
                        cursor: "pointer",
                        fontWeight: "lighter",
                        textDecoration: "underline",
                        color: "black",
                      }}
                      onClick={toggleChangePass} // Add your click handler here
                    >
                      {showChangePass ? "close" : "change password"}
                    </label>
                  </span>
                  {showChangePass && (
                    <ChangePass patient={true} api="/adminChangePassword" />
                  )}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default AdminProfilePage;
