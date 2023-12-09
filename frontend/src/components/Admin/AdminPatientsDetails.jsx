import { Card, Col, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faCalendar,
  faClock,
  faCheckCircle,
  faTimesCircle,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import axios from "axios";

function AdminPatientsDetails() {
  const [patients, setPatients] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.PatientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [expandedPatient, setExpandedPatient] = useState(null);

  const toggleExpand = (index) => {
    if (expandedPatient === index) {
      setExpandedPatient(null);
    } else {
      setExpandedPatient(index);
    }
  };

  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);
  const [loadingg, isLoading] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddNewAdmin, setShowAddNewAdmin] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/patients");
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
      } else if (error.response && error.response.status === 401) {
        setError("Unauthorized");
      }
      setLoading(false);
    }
  };

  const users = responseData;

  const toggleViewModal = (user) => {
    setSelectedPatient(user);
    setViewModal(!viewModal);
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

  const handleClose = () => setShowModal(false);

  const deleteUser = async (id) => {
    setError(null);
    console.log(id);
    setId(id);
    setShowModal(true);
  };

  const actuallyDelete = async () => {
    try {
      axios.defaults.headers.post["Content-Type"] = "application/json";
      const response = await axios.delete(`/deletePatient?id=${id}`, null);

      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error");
    }

    setTimeout(() => {
      setError(null); // Clear the error after 5 seconds
    }, 5000);
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer className="d-flex align-items-center justify-content-center">
          <Button variant="danger" onClick={actuallyDelete}>
            Yes
          </Button>
          <Button variant="success" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
              
      </Modal>
      <div>
        <Table
          striped
          bordered
          hover
          variant="light"
          style={{ width: "1000px" }}
        >
          <thead>
            <tr>
              <th style={{ color: "#099BA0" }}>Username</th>
              <th style={{ color: "#099BA0" }}>Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td onClick={() => toggleViewModal(user)}>{user.username} </td>
                <td onClick={() => toggleViewModal(user)}>{user.name}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={() => deleteUser(user._id)}
                    style={{
                      opacity: 1,
                      color: "#ff6b35",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <Modal show={viewModal} onHide={() => toggleViewModal(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Patient Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPatient && (
              <div>
                <p>Username: {selectedPatient.username}</p>
                <p>Name: {selectedPatient.name}</p>
                <p>Email: {selectedPatient.email}</p>
                <p>Date of Birth: {selectedPatient.dateOfBirth}</p>
                <p>Gender: {selectedPatient.gender}</p>
                <p>Mobile Number: {selectedPatient.mobileNumber}</p>
                <p>
                  Emergency Contact Name: {selectedPatient.emergencyFullName}
                </p>
                <p>
                  Emergency Contact Number:{" "}
                  {selectedPatient.emergencyMobileNumber}
                </p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => toggleViewModal(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default AdminPatientsDetails;
