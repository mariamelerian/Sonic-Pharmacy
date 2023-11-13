import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function ChangePassSuccessModal({ onClose }) {
  return (
    <Modal show={true} centered onHide={onClose}>
      <Modal.Body className="text-center">
        {`You Have Successfully Changed Your Password!`}
      </Modal.Body>
      <Modal.Footer className="d-flex align-items-center justify-content-center">
        
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePassSuccessModal;