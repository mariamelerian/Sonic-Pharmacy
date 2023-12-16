import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../Assets/ClinicLogo.png";
import NotificationsPanel from "../NotificationsPanel";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faSuitcaseMedical,
  faStaffSnake,
} from "@fortawesome/free-solid-svg-icons";
const AppNavbar = (props) => {
  const { hamburgerMenu } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  const phLoggedIn = useSelector((state) => state.pharmacistLogin.isLoggedIn);
  const patientLoggedIn = useSelector(
    (state) => state.patientPharmLogin.isLoggedIn
  );
  const adminLoggedIn = useSelector(
    (state) => state.adminPharmLogin.isLoggedIn
  );

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const phWallet = useSelector((state) => state.pharmacistLogin.wallet);
  const patWallet = useSelector((state) => state.patientPharmLogin.wallet);
  const [wallet, setWallet] = useState("");
  useEffect(() => {
    if (phLoggedIn) {
      setNotifications(true);
      setWho("ph");
      setWallet(phWallet);
    } else if (patientLoggedIn) {
      setNotifications(false);
      setWho("patient");
      setWallet(patWallet);
    } else {
      setNotifications(false);
      setWho("admin");
    }
  }, []);

  const [who, setWho] = useState("");

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  // const [newNotifications, setNewNotifications] = useState(
  //   useSelector((state) => state.newNotifications.newNotifications)
  // );
  // const resetNew = () => {
  //   setNewNotifications(false);
  // };

  return (
    <div>
      <Navbar className="bg-white" sticky="top" style={{ height: "5rem" }}>
        <Container
          fluid
          className="px-5 d-flex align-items-center w-100"
          style={{ display: "flex", height: "100%" }}
        >
          <div style={{ flex: 1 }}>
            {/* Left section */}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {hamburgerMenu}
            </Navbar.Collapse>
          </div>
          {who === "patient" && (
            <a
              className="d-flex"
              style={{
                color: "#ff6b35",
                fontSize: "1.15rem",
                marginLeft: "5rem",
                position: "absolute",
              }}
              href="http://localhost:3000/"
              target="_blank" // Add this attribute to open in a new tab
              rel="noopener noreferrer" // Add this for security
            >
              Visit Clinic
              <FontAwesomeIcon
                style={{
                  color: "#ff6b35",
                  marginLeft: "0.5rem",
                  marginTop: "0.3rem",
                }}
                icon={faSuitcaseMedical}
              />
            </a>
          )}

          <div style={{ flex: 1, textAlign: "center" }}>
            {" "}
            {/* Center section */}
            <div
              style={{
                color: "#adb5bd  ",
                fontSize: "2.3rem",
                fontWeight: "700",
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              <FontAwesomeIcon
                style={{ color: "#adb5bd  ", marginRight: "0.5rem" }}
                icon={faStaffSnake}
              />
              El7a2ny Pharmacy
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {" "}
            {/* Right section */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {who !== "admin" && (
                <div
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "black",
                    fontWeight: "bold",
                    marginRight: "3rem",
                    fontSize: "1.1rem",
                  }}
                >
                  Balance: ${parseFloat(wallet).toFixed(2)}
                </div>
              )}

              <div
                style={{
                  marginLeft: "20px",
                  position: "relative",
                  fontSize: "1.7rem",
                  cursor: "pointer",
                  color: "#212529",
                }}
              >
                <div>
                  <FontAwesomeIcon
                    style={{ color: "#05afb9" }}
                    icon={faBell}
                    onClick={toggleNotifications}
                  />
                  {/* {newNotifications && (
                      <span
                        style={{
                          position: "absolute",
                          top: "0.4rem",
                          right: "-0.15rem",
                          height: "0.6rem",
                          width: "0.6rem",
                          borderRadius: "50%",
                          backgroundColor: "#ff6b35",
                        }}
                      />
                    )} */}
                  {(who === "ph" || who === "patient") && (
                    <NotificationsPanel
                      isOpen={showNotifications}
                      closePanel={toggleNotifications}
                      // resetNew={resetNew}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
