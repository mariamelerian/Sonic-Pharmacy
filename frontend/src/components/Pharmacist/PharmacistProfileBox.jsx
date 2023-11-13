import React, { useState } from "react";
import ChangePass from "../../forms/ChangePass";
import { useSelector } from "react-redux";
import defaultImg from "../../Assets/Pharmacist/UnknownUser.jpg";

function PharmacistProfileBox() {
  const profileBoxStyle = {
    width: "30rem",
    padding: "1rem",
    backgroundColor: "#ffffff",
    textAlign: "center",
    marginLeft: "10rem",
  };

  const profileImageStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px",
  };

  const inputLabel = {
    width: "12rem",
    marginRight: "0.5rem",
    fontWeight: "bold",
    color: "#adb5bd ",
    fontSize: "1rem",
    textAlign: "left",
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

  const _id = useSelector((state) => state.pharmacistLogin.userId);
  const [showChangePass, setShowChangePass] = useState(false); // Set initial state to false

  const toggleChangePass = () => {
    setShowChangePass(!showChangePass);
  };

  return (
    <div style={profileBoxStyle}>
      <img src={profileData.photo || defaultImg} style={profileImageStyle} />
      <h2 style={{ marginBottom: "1rem" }}>
        <strong>Dr. {profileData.name}</strong>
      </h2>
      <div className="d-flex flex-column align-items-start">
        <p class="d-flex flex-row">
          <div style={inputLabel}>Username:</div>
          <span>{profileData.username}</span>
        </p>

       <p className="d-flex flex-row">
  <div style={inputLabel}>Password:</div>
  <span
    onClick={toggleChangePass}
    style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
  >
    {showChangePass ? "close" : "change password"}
  </span>
  {showChangePass && (
    <ChangePass patient={false} api="/pharmacistChangePassword" />
  )}
</p>
        <p class="d-flex flex-row">
          <div style={inputLabel}>Email: </div>

          <span>{profileData.email}</span>
        </p>
        <p class="d-flex flex-row">
          <div style={inputLabel}>Affiliation: </div>

          <span>{profileData.affiliation}</span>
        </p>
        <p class="d-flex flex-row">
          <div style={inputLabel}>Hourly Rate:</div>

          <span>{profileData.hourlyRate} LE/hr</span>
        </p>
      </div>
      <p class="d-flex flex-row">
        <div style={inputLabel}>Educational Background:</div>
        <span>{profileData.educationalBackground}</span>
      </p>
    </div>
  );
}

export default PharmacistProfileBox;
