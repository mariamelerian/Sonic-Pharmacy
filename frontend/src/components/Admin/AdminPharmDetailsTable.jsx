import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AdminPharmDetailsTable() {
  const [pharmacists, setPharmacists] = useState([]);
  const [error1, setError] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [id, setId] = useState("");
  const [selectedPharmacist, setSelectedPharmacist] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleClose = () => {
    setShowDetailsModal(false);
    setShowDeleteConfirmationModal(false);
  };

  const showPharmacistDetails = (pharmacist, columnIndex) => {
    if (columnIndex === 0 || columnIndex === 1) {
      setSelectedPharmacist(pharmacist);
      setShowDetailsModal(true);
    }
  };

  const deleteUser = async (id) => {
    setError(null);
    setId(id);
    setShowDeleteConfirmationModal(true);
  };

  const actuallyDelete = async () => {
    try {
      const response = await axios.delete(`/deletePharmacist?_id=${id}`);

      if (response.status === 200) {
        fetchData();
        setShowDeleteConfirmationModal(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error");
    }

    setTimeout(() => {
      setError(null); // Clear the error after 5 seconds
    }, 5000);
  };

  return (
    <div>
      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={handleClose}>
        <Modal.Body>
          {selectedPharmacist && (
            <div>
              <p>Username: {selectedPharmacist.username}</p>
              <p>Email: {selectedPharmacist.email}</p>
              <p>Date of Birth: {selectedPharmacist.dateOfBirth}</p>
              <p>Hourly Rate: {selectedPharmacist.hourlyRate} LE/hr</p>
              <p>Affiliation: {selectedPharmacist.affiliation}</p>
              <p>Educational Background: {selectedPharmacist.education}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirmationModal} onHide={handleClose}>
        <Modal.Body>
          Are you sure you want to delete this pharmacist?
        </Modal.Body>
        <Modal.Footer className="d-flex align-items-center justify-content-center">
          <Button variant="danger" onClick={actuallyDelete}>
            Yes
          </Button>
          <Button
            variant="success"
            onClick={() => setShowDeleteConfirmationModal(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Table */}
      <Table striped bordered hover variant="light" style={{ width: "1000px" }}>
        <thead>
          <tr>
            <th
              style={{ color: "#099BA0" }}
              onClick={() => showPharmacistDetails(pharmacists[0], 0)}
            >
              Username
            </th>
            <th
              style={{ color: "#099BA0" }}
              onClick={() => showPharmacistDetails(pharmacists[0], 1)}
            >
              Name
            </th>
            <th style={{ color: "#099BA0" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pharmacists.map((pharmacist, index) => (
            <tr key={pharmacist._id}>
              <td onClick={() => showPharmacistDetails(pharmacist, 0)}>
                {pharmacist.username}
              </td>
              <td onClick={() => showPharmacistDetails(pharmacist, 1)}>
                {pharmacist.name}
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() => {
                    deleteUser(pharmacist._id);
                  }}
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
  );
}

export default AdminPharmDetailsTable;
