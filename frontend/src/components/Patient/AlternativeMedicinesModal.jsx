import React from "react";
import { Modal, Button } from "react-bootstrap";

const AlternativeMedicinesModal = ({ show, handleClose, alternativeMedicines }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Alternative Medicines</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alternativeMedicines.length > 0 ? (
          <ul>
            {alternativeMedicines.map((medicine, index) => (
              <li key={index}>{medicine.name}</li>
            ))}
          </ul>
        ) : (
          <p>No available alternatives with the same active ingredient.</p>
        )}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default AlternativeMedicinesModal;
