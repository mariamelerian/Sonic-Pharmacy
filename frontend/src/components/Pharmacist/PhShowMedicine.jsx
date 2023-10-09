import React, { useState } from "react";
import { Card, Col, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import doctorImg from "../../Assets/Patient/Doctor.jpg";
import MedicineForm from "./PhNewMedicine";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function PhShowMedicines() {
  const Medicines = [
    {
      medicineName: "Medicine 1",
      price: 9.99,
      description: "This is the description for Medicine 1.",
      medicinalUse: "Medicinal use for Medicine 1.",
      image: doctorImg,
      quantity: 100,
      sales: 50
    },
    {
      medicineName: "Medicine 2",
      price: 19.99,
      description: "This is the description for Medicine 2.",
      medicinalUse: "Medicinal use for Medicine 2.",
      image: doctorImg,
      quantity: 200,
      sales: 150
    },
    // Add more medicine objects as needed
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMedicine, setExpandedMedicine] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExpand = (index) => {
    if (expandedMedicine === index) {
      setExpandedMedicine(null);
    } else {
      setExpandedMedicine(index);
    }
  };

  const filteredMedicines = Medicines.filter((medicine) =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showMedicineForm, setShowMedicineForm] = useState(false);

  const toggleMedicineForm = () => {
    setShowMedicineForm(!showMedicineForm);
  };

  return (
  <div>
    {showMedicineForm && <MedicineForm />}
      <Form className="my-4 mx-3">
        <Form.Control
          type="text"
          placeholder="Search Medicines"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form>
      <Row>
     
  
        {filteredMedicines.map((medicine, index) => (
          <Col key={medicine.medicineName} lg={6} md={6} sm={12}>
            <Card className="mb-4 mx-3 bg-light">
              <Card.Header className="text-center">
                Medicine Name: {medicine.medicineName}
              </Card.Header>
              <Card.Body className="text-center">
                <div className="medicine-image-container">
                  <img
                    src={medicine.image}
                    alt={medicine.medicineName}
                    className="medicine-image"
                  />
                </div>
                <div className="medicine-price">Price: ${medicine.price}</div>
                {expandedMedicine === index ? (
                  <>
                    <div className="medicine-description">
                      <h5>Description</h5>
                      <p>{medicine.description}</p>
                    </div>
                    <hr />
                    <div className="medicine-use">
                      <h5>Medicinal Use</h5>
                      <p>{medicine.medicinalUse}</p>
                    </div>
                    <hr />
                    <div className="medicine-quantity">
                      <h5>Available Quantity</h5>
                      <p>{medicine.quantity}</p>
                    </div>
                    <hr />
                    <div className="medicine-sales">
                      <h5>Sales</h5>
                      <p>{medicine.sales}</p>
                    </div>
                    <div
                      className="expand-button"
                      onClick={() => handleExpand(index)}
                    >
                      <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                  </>
                ) : (
                  <div
                    className="expand-button"
                    onClick={() => handleExpand(index)}
                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                )}
                
              </Card.Body>
            </Card>
          </Col>
        ))}
         {!showMedicineForm && (
      <Col lg={6} md={6} sm={12}>
        <Card
          className="mb-4 mx-3 bg-light"
          onClick={toggleMedicineForm}
          style={{ height: "100%" }}
        >
          <Card.Body className="text-center d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faPlus} size="3x" />
          </Card.Body>
          </Card>
          </Col>
         )}
      </Row>
    </div>
  );
}

export default PhShowMedicines;