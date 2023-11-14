import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function CheckOutDoneModal() {
  return (
    <Modal show={true} centered>
      <Modal.Body className="text-center">
        {`You have successfully Checked Out!`}
      </Modal.Body>
      <Modal.Footer className="d-flex align-items-center justify-content-center">
      <Link to="/patient">
          <Button variant="primary">Go Back To Main Page</Button>
        </Link>      </Modal.Footer>
    </Modal>
  );
}

export default CheckOutDoneModal;
