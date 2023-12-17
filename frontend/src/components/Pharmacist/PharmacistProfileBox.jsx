import React, { useState } from "react";
import ChangePass from "../../forms/ChangePass";
import { useSelector } from "react-redux";
import defaultImg from "../../Assets/Pharmacist/UnknownUser.jpg";
import { ListGroup } from "react-bootstrap";

function PharmacistProfileBox() {
  const inputLabel = {
    width: "12rem",
    marginRight: "0.5rem",
    fontWeight: "bold",
    color: "#adb5bd ",
    fontSize: "1rem",
    textAlign: "left",
  };

  const listItemStyle = {
    fontSize: "1.05rem", // Font size for all information
    marginBottom: "0.75rem", // Margin bottom for all information
    verticalAlign: "top", // Align items at the top of each column
  };

  const labelStyle = {
    cursor: "pointer",
    fontWeight: "lighter",
    textDecoration: "underline",
    color: "inherit",
  };

  const [profileData, setProfileData] = useState({
    photo: useSelector((state) => state.pharmacistLogin.photo),
    name: useSelector((state) => state.pharmacistLogin.name),
    username: useSelector((state) => state.pharmacistLogin.username),
    email: useSelector((state) => state.pharmacistLogin.email),
    affiliation: useSelector((state) => state.pharmacistLogin.affiliation),
    hourlyRate: useSelector((state) => state.pharmacistLogin.hourlyRate),
    birthDate: useSelector((state) => state.pharmacistLogin.birthdate),
    phoneNumber: useSelector((state) => state.pharmacistLogin.phoneNumber),
    educationalBackground: useSelector(
      (state) => state.pharmacistLogin.education
    ),
  });

  const [showChangePass, setShowChangePass] = useState(false); // Set initial state to false

  const toggleChangePass = () => {
    setShowChangePass(!showChangePass);
  };

  return (
    <div style={{ width: "40rem" }}>
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
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>Name: </span>
            {profileData.name}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              Username:{" "}
            </span>
            {profileData.username}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              Password:
            </span>{" "}
            <span>
              <label style={labelStyle} onClick={toggleChangePass}>
                {showChangePass ? "close" : "change password"}
              </label>
            </span>
            {showChangePass && (
              <ChangePass patient={true} api="/pharmacistChangePassword" />
            )}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              Email:{" "}
            </span>
            {profileData.email}
          </div>
          {/* <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              Phone Number:{" "}
            </span>
            {profileData.phoneNumber}
          </div> */}
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              Affiliation:
            </span>{" "}
            {profileData.affiliation}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              Hourly Rate:
            </span>{" "}
            ${profileData.hourlyRate}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              Educational background:
            </span>{" "}
            {profileData.educationalBackground}
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default PharmacistProfileBox;
