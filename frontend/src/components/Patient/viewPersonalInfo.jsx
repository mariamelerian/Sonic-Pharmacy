import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import ChangePass from "../../forms/ChangePass";
import { Button } from "react-bootstrap";
import axios from "axios";

function ViewPersonalInfo() {
  const user = useSelector((state) => state.patientPharmLogin);
  const [showChangePass, setShowChangePass] = useState(false);
  const [showAddAddressInput, setShowAddAddressInput] = useState(false);
  const [newAddress, setNewAddress] = useState(""); // Store the input value
  const [addresses, setAddresses] = useState([]); // Store the addresses

  const fetchData = async () => {
    try {
      const response = await axios.get("/patientAddresses");

      if (response.status === 200) {
        await setAddresses(response.data);
        console.log(response.data);
      } else {
        console.log("Server error");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        await setAddresses(["No Adresses Found"]);
      } else if (error.response && error.response.status === 500) {
        await setAddresses(["Server error"]);
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleSaveNewAddress = async () => {
    // Perform the logic to save the new address
    console.log("New address:", newAddress);

    try {
      const response = await axios.post("/addAddress", {
        address: newAddress,
      });
      if (response.status === 200) {
        console.log("added new address");
        setAddresses(response.data);
      } else {
        console.log("Server error");
      }
    } catch (error) {
      console.log(error.message);
    }

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
            {user.name}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0" }}>Username:</span>
            {user.username}
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
            {user.email}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0" }}>Phone Number:</span>
            {user.phoneNumber}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0" }}>Emergency Contact Name:</span>{" "}
            {user.emergencyName}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0" }}>Emergency Contact Number:</span>{" "}
            {user.emergencyNumber}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0" }}>Emergency Relation:</span>{" "}
            {user.emergencyRelation}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0" }}>My Addresses:</span>
          </div>
          {
            /* Display existing addresses */
            addresses.map((address, index) => (
              <div key={index} style={{ marginLeft: "2rem" }}>
                <span>Address {index + 1}:</span>
                {address}
              </div>
            ))
          }

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
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default ViewPersonalInfo;
