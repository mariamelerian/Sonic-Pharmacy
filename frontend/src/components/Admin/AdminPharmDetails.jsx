import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AdminPharmDetails() {
  const [pharmacists, setPharmacists] = useState([]);
  const [error1, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {}, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/pharmacists");
      if (response.status === 200) {
        setPharmacists(response.data);
      } else {
        console.log("Server error");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("No pharmacists found.");
      } else if (error.response && error.response.status === 500) {
        setError("Server Error");
      }
    }
  };

  const [expandedPharmacist, setExpandedPharmacist] = useState(null);

  const toggleExpand = (index) => {
    if (expandedPharmacist === index) {
      setExpandedPharmacist(null);
    } else {
      setExpandedPharmacist(index);
    }
  };

  const handleClose = () => setShowModal(false);

  const deleteUser = async (id) => {
    setError(null);
    setId(id);
    setShowModal(true);
  };

  const actuallyDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/deletePharmacist?_id=${id}`
      );

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
    <div>
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
      {pharmacists.map((pharmacist, index) => (
        <Card
          className="mb-4 mx-3 bg-light"
          key={pharmacist._id}
          style={{ width: "25rem" }}
        >
          <Card.Header
            className="d-flex align-items-center justify-content-between"
            onClick={() => toggleExpand(index)}
            style={{ cursor: "pointer" }}
          >
            <span>{pharmacist.name}</span>
            <FontAwesomeIcon
              icon={expandedPharmacist === index ? faChevronUp : faChevronDown}
            />
          </Card.Header>
          {expandedPharmacist === index && (
            <Card.Body>
              <Row>
                <Col lg={8}>
                  <Card.Text>
                    <div className="patient-info">
                      <p>Username: {pharmacist.username}</p>
                      <p>Email: {pharmacist.email}</p>
                      <p>Date of Birth: {pharmacist.dateOfBirth}</p>
                      <p>Hourly Rate: {pharmacist.hourlyRate} LE/hr</p>
                      <p>Affiliation: {pharmacist.affiliation}</p>
                      <p>Educational Background: {pharmacist.education}</p>
                      <Button onClick={() => deleteUser(pharmacist._id)}>
                        Delete Pharmacist
                      </Button>
                    </div>
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          )}
        </Card>
      ))}
    </div>
  );
}

export default AdminPharmDetails;
