import {
    faCalendarCheck,
    faPrescription,
    faPrescriptionBottle,
    faPrescriptionBottleAlt,
    faRightFromBracket,
    faFileLines,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { useState } from "react";
  import { slide as Menu } from "react-burger-menu";
  import { Link } from "react-router-dom";
  import NotificationsPanel from "../NotificationsPanel";

  function PhHamburgerMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
  
    const handleMenuClick = () => {
      setMenuOpen(!menuOpen);
    };
  
    const closeMenu = () => {
      setMenuOpen(false);
    };
    return (
      <div>
        <Menu
          customBurgerIcon={
            <div
              onClick={handleMenuClick}
              style={{
                display: "block",
                borderRadius: "0.25rem",
                border: "1px solid var(--theme-primary, #05AFB9)",
                background: "var(--HitBox, rgba(255, 255, 255, 0.00))",
                padding: "8px", // Add padding to create space for the SVG icon
              }}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 30 30"
                fill="none"
                onClick={handleMenuClick}
              >
                <path d="M4 23H26H4Z" fill="#05AFB9" />
                <path
                  d="M4 7H26M4 15H26M4 23H26"
                  stroke="#05AFB9"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
              </svg>{" "}
            </div>
          }
          customCrossIcon={false}
          width={"20rem"} // Set the width to 20rem
          styles={{
            bmBurgerButton: {
              position: "fixed",
              width: "40px",
              height: "40px",
              left: "20px", // Adjust the distance from the left edge
              top: "20px",
            },
            bmBurgerBars: {
              background: "white", // Set the burger icon color to white
            },
            bmCrossButton: {
              display: "none", // Hide the close (X) button
            },
            bmMenu: {
              position: "fixed", // Set the position to 'fixed'
              top: "0", // Adjust the top position to '0' to start from the top
              left: "0", // Adjust the left position to '0' to start from the left
              background: "white", // Set the menu background color to white
              width: "20rem", // Set the width to 20rem
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Add a box shadow for better visibility
            },
            bmMenuWrap: {
              position: "fixed",
              // Set the position to 'fixed'
              top: "0", // Adjust the top position to '0' to start from the top
              left: "0", // Adjust the left position to '0' to start from the left
              height: "100%",
              background: "red",
            },
            bmItemList: {
              color: "var(--theme-dark, #212529)",
              padding: "0.8rem",
            },
            bmItem: {
              display: "block",
              margin: "1rem 0",
            },
            bmOverlay: {
              position: "fixed", // Set the position to 'fixed'
              top: "0", // Adjust the top position to '0' to start from the top
              left: "0", // Adjust the left position to '0' to start from the left
              width: "100%", // Set the width to 100% to cover the entire screen
              height: "100%",
              background: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <div className="menu-list">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  color: "#404040",
                  fontSize: "1.2rem",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "0.75rem",
                  marginLeft: "1rem",
                }}
              >
                Hello
              </div>
            </div>
  
           
            {/* Add a line between menu items */}
{/*             <hr className="menu-line" />
            <a
              id="profile"
              className="menu-item"
              href="/patient/profile"
              onClick={closeMenu}
              style={{
                color: "var(--gray-600, #6C757D)",
                fontFamily: "Roboto",
                fontSize: "0.9375rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "1rem" ,
                display: "flex",
                alignItems: "center",
                textDecoration: "none", // To remove underlines
                padding: "0.5rem 0",
              }}
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "0.5rem" }} />
              My Profile
            </a>
   */}

<hr className="menu-line" />
          <a
            id="profile"
            className="menu-item"
            href="/Pharmacist/pharmacist-profile"
            onClick={closeMenu}
            style={{
              color: "var(--gray-600, #6C757D)",
              fontFamily: "Roboto",
              fontSize: "0.9375rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1rem" /* 106.667% */,
              display: "flex",
              alignItems: "center",
              textDecoration: "none", // To remove underlines
              padding: "0.5rem 0",
            }}
          >
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "0.5rem" }} />
            My Profile
          </a>
            <hr className="menu-line" />
            <a
              id="prescription"
              className="menu-item"
              href="/pharmacist/ph-medicine"
              onClick={closeMenu}
              style={{
                color: "var(--gray-600, #6C757D)",
                fontFamily: "Roboto",
                fontSize: "0.9375rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "1rem" /* 106.667% */,
                display: "flex",
                alignItems: "center",
                textDecoration: "none", // To remove underlines
                padding: "0.5rem 0",
              }}
            >
              <FontAwesomeIcon
                icon={faPrescriptionBottle}
                style={{ marginRight: "0.5rem" }}
              />
              Available Medicine
            </a>

            <hr className="menu-line" />
            <a
              id="prescription"
              className="menu-item"
              href="/pharmacist/ph-salesreport"
              onClick={closeMenu}
              style={{
                color: "var(--gray-600, #6C757D)",
                fontFamily: "Roboto",
                fontSize: "0.9375rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "1rem" /* 106.667% */,
                display: "flex",
                alignItems: "center",
                textDecoration: "none", // To remove underlines
                padding: "0.5rem 0",
              }}
            >
              <FontAwesomeIcon icon={faFileLines}
                style={{ marginRight: "0.5rem" }}
              />
              Sales Report
            </a>
  
            <hr className="menu-line" />
            <a
              id="appointment"
              className="menu-item"
              href="/pharmacist/ph-notifications"
              onClick={closeMenu}
              style={{
                color: "var(--gray-600, #6C757D)",
                fontFamily: "Roboto",
                fontSize: "0.9375rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "1rem" /* 106.667% */,
                display: "flex",
                alignItems: "center",
                textDecoration: "none", // To remove underlines
                padding: "0.5rem 0",
              }}
            >
            
              <FontAwesomeIcon
                icon={faRightFromBracket}
                style={{ marginRight: "0.5rem" }}
                
              />
              View Notifications
            </a>
            <a
              id="appointment"
              className="menu-item"
              href="/"
              onClick={closeMenu}
              style={{
                color: "var(--gray-600, #6C757D)",
                fontFamily: "Roboto",
                fontSize: "0.9375rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "1rem" /* 106.667% */,
                display: "flex",
                alignItems: "center",
                textDecoration: "none", // To remove underlines
                padding: "0.5rem 0",
              }}
            >
            
              <FontAwesomeIcon
                icon={faRightFromBracket}
                style={{ marginRight: "0.5rem" }}
                
              />
              Logout
            </a>
            <hr className="menu-line" />
          </div>
        </Menu>
      </div>
    );
  }
  export default PhHamburgerMenu;
  