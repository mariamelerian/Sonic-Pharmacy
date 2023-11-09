import React, { useState } from "react";
import PatientNewAddressForm from "../../components/Patient/PatientNewAddressForm";
import PatientExistingAddress from "./PatientExistingAddress";

function AddressRadioButtons() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const radioLabelStyle = {
    display: "block",
    marginBottom: "10px",
    fontSize: "20px", // Increased font size
    textAlign: "center", // Center-align the labels
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  const addressTitleStyle = {
    fontSize: "24px", // Increased font size for the address title
    marginBottom: "10px",
  };

  const lineStyle = {
    borderBottom: "1px solid #ccc",
    width: "50%",
    margin: "10px auto",
  };

  const newAddressTextStyle = {
    textAlign: "left", // Set text alignment to start from the left
  };

  return (
    <div style={containerStyle}>
      <h1 style={addressTitleStyle}>Pick Delivery Address</h1>
      <div style={lineStyle}></div>
      <label style={radioLabelStyle}>
        <input
          type="radio"
          value="existing"
          checked={selectedOption === "existing"}
          onChange={handleOptionChange}
        />
        Choose Existing Address
      </label>
      <label style={radioLabelStyle}>
        <input
          type="radio"
          value="new"
          checked={selectedOption === "new"}
          onChange={handleOptionChange}
        />
        Add New Address
      </label>
      {/* Conditional rendering of the address form */}
      {selectedOption === "new" ? (
        <PatientNewAddressForm textStyle={newAddressTextStyle} />
      ) : selectedOption === "existing" ? (
        <PatientExistingAddress />
      ) : null}
    </div>
  );
}

export default AddressRadioButtons;
