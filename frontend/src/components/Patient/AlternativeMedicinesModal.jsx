import React from "react";
import { Modal, Card } from "react-bootstrap";

const AlternativeMedicinesModal = ({ show, handleClose, alternativeMedicines }) => {
  const renderMedicineDetails = (medicine) => (
    <Card className="mb-3" style={{ maxWidth: "calc(50% - 1rem)", marginRight: "1rem", marginBottom: "1rem" }}>
      <Card.Body>
        <div className="medicine-container">
          <div className="medicine-image-container">
            <img
              src={medicine.picture}
              alt={medicine.name}
              className="img-fluid"
            />
          </div>
          <div className="details-container">
            <div className="medicine-name font-weight-bold">
              {medicine.name}
            </div>
            <div className="medicine-description">
              <h6>Description:</h6>
              <p>{medicine.description}</p>
            </div>
            <div className="medicine-activeIngredients">
              <h6>Active Ingredients:</h6>
              <ul className="list-unstyled">
                {medicine.activeIngredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>Alternative Medicines</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-wrap">
          {alternativeMedicines.length > 0 ? (
            alternativeMedicines.map((medicine) => renderMedicineDetails(medicine))
          ) : (
            <p>No available alternatives with the same active ingredient.</p>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AlternativeMedicinesModal;
