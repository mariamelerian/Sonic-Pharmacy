import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function ShowSalesReport() {
  const [pharmacists, setPharmacists] = useState([]);
  const [error1, setError] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
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
      const response = await axios.delete(
        `http://localhost:8000/deletePharmacist?_id=${id}`
      );

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
    <div className="text-center">
        <br></br>
      {/* Table */}
      <Table striped bordered hover variant="light" style={{ width: '1000px', margin: 'auto' }}>
        <thead>
          <tr>
          <th style={{ color: '#099BA0' }} >
              Date
            </th>
            <th style={{ color: '#099BA0' }} >
              Medicine Name
            </th>
            <th style={{ color: '#099BA0' }} >
              Quantity
            </th>
            <th style={{ color: '#099BA0' }}>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {pharmacists.map((pharmacist, index) => (
            <tr key={pharmacist._id}>
              <td onClick={() => showPharmacistDetails(pharmacist, 0)}>{pharmacist.username}</td>
              <td onClick={() => showPharmacistDetails(pharmacist, 1)}>{pharmacist.name}</td>
              <td>
              </td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br></br>
      <Table striped bordered hover variant="light" style={{ width: '1000px' , margin: 'auto' }}>
        <thead>
          <tr>
            <th style={{ color: '#099BA0' }} >
              Total Quantity
            </th>
            <th style={{ color: '#099BA0' }} >
              Total Revenue
            </th>
          </tr>
        </thead>
        <tbody>
          {pharmacists.map((pharmacist, index) => (
            <tr key={pharmacist._id}>
              <td onClick={() => showPharmacistDetails(pharmacist, 0)}>{pharmacist.username}</td>
              <td onClick={() => showPharmacistDetails(pharmacist, 1)}>{pharmacist.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>


    </div>
  );
}

export default ShowSalesReport;
