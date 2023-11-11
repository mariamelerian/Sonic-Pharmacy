import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import MedicineForm from './PhNewMedicine';

function AddMedicineModal({ fetchData }) {
  const [show, setShow] = useState(true); // Set 'show' to true initially

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Medicine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MedicineForm onClose={handleClose} fetchData={fetchData} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMedicineModal;
