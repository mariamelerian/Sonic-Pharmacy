import React, { useState } from "react";
import { Card, Col, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import doctorImg from "../../Assets/Patient/Doctor.jpg";

function AdminShowMedicine() {
  const Medicines = [
    {
      medicineName: "Medicine 1",
      price: 9.99,
      description: "This is the description for Medicine 1.",
      medicinalUse: "Medicinal use for Medicine 1.",
      image: doctorImg
    },
    {
      medicineName: "Medicine 2",
      price: 19.99,
      description: "This is the description for Medicine 2.",
      medicinalUse: "Medicinal use for Medicine 2.",
      image: doctorImg
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

  return (
    <div>
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
      </Row>
    </div>
  );
}

export default AdminShowMedicine;