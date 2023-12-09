import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import AddNewAdmin from "../../forms/AddNewAdmin";
import axios from "axios";

export default function AdminViewTable() {
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [showAddNewAdmin, setShowAddNewAdmin] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/admins");
      if (response.status === 200) {
        setResponseData(response.data);
      } else {
        console.log("Server error");
      }
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("No data found.");
      } else if (error.response && error.response.status === 500) {
        setError("Server Error");
      }
      setLoading(false);
    }
  };

  const users = responseData;

  useEffect(() => {}, [username]);

  const toggleAddNewAdmin = () => {
    setShowAddNewAdmin(!showAddNewAdmin);
  };

  const closeForm = () => {
    setShowAddNewAdmin(false);
  };

  const addBtnText = showAddNewAdmin ? "Close Form" : "Add new Adminstrator";
  const btnStyle = {
    backgroundcolor: `${showAddNewAdmin ? "#ff6b35" : "#05afb9"} !important`, //leh msh shaghala?
    marginBottom: "20px",
  };
  const iconStyle = {
    opacity: 1,
    color: "#f0f0f0",
    fontSize: "20px",
    cursor: "pointer",
    marginLeft: "10px",
  };

  return (
    <>
      <Button style={btnStyle} id="newAdminForm" onClick={toggleAddNewAdmin}>
        {addBtnText}
        {showAddNewAdmin ? (
          <FontAwesomeIcon icon={faXmark} style={iconStyle} />
        ) : (
          <FontAwesomeIcon icon={faPlus} style={iconStyle} />
        )}
      </Button>
      {showAddNewAdmin && (
        <AddNewAdmin fetchData={fetchData} closeForm={closeForm} />
      )}

      <Table striped bordered hover variant="light" style={{ width: "1000px" }}>
        <thead>
          <tr>
            <th style={{ color: "#099BA0" }}>Username</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
