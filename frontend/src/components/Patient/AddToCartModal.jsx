import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AddToCartModal({ show, handleClose, itemName, onConfirm }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body className="text-center">{`${itemName} has been added to your cart`}</Modal.Body>
      <Modal.Footer className="d-flex align-items-center justify-content-center">
        <Button variant="primary" onClick={onConfirm}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddToCartModal;
