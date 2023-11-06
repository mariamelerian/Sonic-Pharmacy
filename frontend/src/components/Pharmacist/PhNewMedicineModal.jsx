import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import MedicineForm from './MedicineForm'; // Import your MedicineForm component

function AddMedicineModal({ fetchData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Medicine
      </Button>

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
    </>
  );
}

export default AddMedicineModal;
