import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import ChangePass from "../../forms/ChangePass";
import { Button } from "bootstrap";

function ViewPersonalInfo() {
  const user = useSelector((state) => state.patientLogin);
  const [showChangePass, setShowChangePass] = useState(false);
  const [showAddAddressInput, setShowAddAddressInput] = useState(false);
  const [newAddress, setNewAddress] = useState(""); // Store the input value

  const listItemStyle = {
    fontSize: "1rem",
    marginBottom: "0.7rem",
    verticalAlign: "top",
    fontWeight: "600",
  };

  const labelStyle = {
    cursor: "pointer",
    fontWeight: "lighter",
    textDecoration: "underline",
    color: "inherit",
  };

  const toggleChangePass = () => {
    setShowChangePass(!showChangePass);
  };

  const handleAddNewAddressClick = () => {
    setShowAddAddressInput(true);
  };

  const handleNewAddressInputChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleSaveNewAddress = () => {
    // Perform the logic to save the new address
    console.log("New address:", newAddress);

    // Reset the state and hide the input field
    setNewAddress("");
    setShowAddAddressInput(false);
  };

  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          fontSize: "2.5rem",
          fontWeight: "600",
          color: "#212529",
          lineHeight: "1.5",
        }}
      >
        Personal Information
      </div>
      <ListGroup>
        <ListGroup.Item>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0" }}>Name:</span>
            {/* Display user's name */}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0" }}>Username:</span>
            {/* Display user's username */}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0" }}>Password:</span>
            <span>
              <label style={labelStyle} onClick={toggleChangePass}>
                {showChangePass ? "close" : "change password"}
              </label>
            </span>
            {showChangePass && (
              <ChangePass patient={true} api="/patientChangePassword" />
            )}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0" }}>Email:</span>
            {/* Display user's email */}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0" }}>Phone Number:</span>
            {/* Display user's phone number */}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0" }}>My Addresses:</span>
          </div>
          <div style={{ marginLeft: "2rem" }}>
            <span>Address 1:</span>
            {/* Display existing address 1 */}
          </div>
          <div style={{ marginLeft: "2rem" }}>
            <span>Address 2:</span>
            {/* Display existing address 2 */}
          </div>
          <div style={{ marginLeft: "2rem" }}>
            <span>Address 3:</span>
            {/* Display existing address 3 */}
          </div>
          {showAddAddressInput ? (
            <div>
              <input
                type="text"
                placeholder="Enter new address"
                value={newAddress}
                onChange={handleNewAddressInputChange}
              />
              <Button variant="primary" onClick={handleSaveNewAddress}>
                Save
              </Button>
            </div>
          ) : (
            <Button variant="primary" onClick={handleAddNewAddressClick}>
              Add New Address
            </Button>
          )}
          {/* <div style={listItemStyle}>
            <span style={{ color: "#099BA0" }}>Emergency Relation:</span>{" "}
            {user.emergencyRelation}
          </div> */}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default ViewPersonalInfo;
