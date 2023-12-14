import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import logo from "../../Assets/ClinicLogo.png";
const AppNavbarGuest = (props) => {
  const { hamburgerMenu } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <Navbar className="bg-white" sticky="top" style={{ height: "5rem" }}>
        <Container fluid className="px-5">
          <div
            className="d-flex flex-direction-row col-5"
            style={{ gap: "20px" }}
          >
            <Navbar.Collapse>{hamburgerMenu}</Navbar.Collapse>
          </div>
          <div
            className="col-7"
            style={{
              color: "#ff6b35",
              fontSize: "3rem",
              fontWeight: "700",
              paddingLeft: "0.3rem",
            }}
          >
            El7a2ny Pharmacy
          </div>

          <div
            style={{
              position: "relative",
              display: "inline-block",
              fontSize: "1.7rem",
              cursor: "pointer",
              color: "#212529",
            }}
          ></div>

        {!props && (
            <Link
              className="d-flex"
              style={{ color: "#05afb9", fontSize: "1.15rem" }}
              to={"/PharmSignup"}
            >
              Register as a Doctor
            </Link>
          )}
          {props && (
            <Link
              className="d-flex"
              style={{ color: "#05afb9", fontSize: "1.15rem", paddingRight:"10.5rem" }}
              to={"/"}
            >
              Login
            </Link>
          )}
          
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbarGuest;
