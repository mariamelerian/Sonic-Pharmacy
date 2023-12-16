import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import ChangePass from "../../forms/ChangePass";
import { Button, Form } from "react-bootstrap";
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
            {user.name}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              Username:{" "}
            </span>
            {user.username}
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
              <ChangePass patient={true} api="/patientChangePassword" />
            )}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              Email:{" "}
            </span>
            {user.email}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              Phone Number:{" "}
            </span>
            {user.phoneNumber}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              Emergency Contact Name:
            </span>{" "}
            {user.emergencyName}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              Emergency Contact Number:
            </span>{" "}
            {user.emergencyNumber}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              Emergency Relation:
            </span>{" "}
            {user.emergencyRelation}
          </div>
          <div style={listItemStyle}>
            <span style={{ color: "#099BA0", fontWeight: "bold" }}>
              My Addresses:
            </span>
          </div>
          {addresses.map(
            (address, index) =>
              address != null && (
                <div
                  key={index}
                  style={{
                    marginLeft: "2rem",
                    paddingLeft: "1rem",
                    textIndent: "-1rem",
                    fontSize: "1.05rem",
                  }}
                >
                  &#8226; {address}
                </div>
              )
          )}

          {showAddAddressInput ? (
            <div className="d-flex flex-row" style={{ marginTop: "0.5rem" }}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter new address"
                  value={newAddress}
                  style={{ width: "15rem" }}
                  onChange={handleNewAddressInputChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                style={{ marginLeft: "0.5rem" }}
                onClick={handleSaveNewAddress}
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              style={{ marginTop: "0.5rem" }}
              onClick={handleAddNewAddressClick}
            >
              Add New Address
            </Button>
          )}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default ViewPersonalInfo;
