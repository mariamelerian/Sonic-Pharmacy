// import React, { useState } from "react";
//  import { Card, Col, Row, Form, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faChevronDown,
//   faChevronUp,
//   faEdit,
// } from "@fortawesome/free-solid-svg-icons";
// import doctorImg from "../../Assets/Patient/Doctor.jpg";
import MedicineForm from "./PhNewMedicine";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function PhShowMedicines() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/medicines");
      if (response.status === 200) {
        setResponseData(response.data);
        setLoading(false);
      } else {
        setError("Server error");
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
      setLoading(false);
    }
  };
  const Medicines = responseData;
  console.log(responseData);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMedicines = responseData.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showMedicineForm, setShowMedicineForm] = useState(false);

  const toggleMedicineForm = () => {
    setShowMedicineForm(!showMedicineForm);
  };

  const onClose = () => {
    setShowMedicineForm(false);
  };

  const [editedMedicine, setEditedMedicine] = useState(null);

  const handleEditMedicine = (index) => {
    setEditedMedicine(index);
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...Medicines];
    updatedMedicines[index][field] = value;
    setEditedMedicine(updatedMedicines);
  };

  const handleSaveMedicine = async (index) => {
    // Perform save logic here
    setEditedMedicine(null);
  };

  return (
    <div>
      {showMedicineForm && (
        <MedicineForm fetchData={fetchData} onClose={onClose} />
      )}

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
          <Col key={medicine.name} lg={6} md={6} sm={12}>
            <Card className="mb-4 mx-3 bg-light">
              <Card.Header className="text-center">
                Medicine Name: {medicine.name}
              </Card.Header>
              <Card.Body className="text-center">
                <div className="medicine-image-container">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="medicine-image"
                  />
                </div>
                <div className="medicine-price">Price: ${medicine.price}</div>
                {editedMedicine === index ? (
                  <div>
                    <Form.Group>
                      <Form.Label>Medicine Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={medicine.medicineName}
                        onChange={(e) =>
                          handleMedicineChange(
                            index,
                            "medicineName",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        value={medicine.price}
                        onChange={(e) =>
                          handleMedicineChange(index, "price", e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={medicine.description}
                        onChange={(e) =>
                          handleMedicineChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Medicinal Use</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={medicine.medicinalUse}
                        onChange={(e) =>
                          handleMedicineChange(
                            index,
                            "medicinalUse",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        value={medicine.quantity}
                        onChange={(e) =>
                          handleMedicineChange(
                            index,
                            "quantity",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Sales</Form.Label>
                      <Form.Control
                        type="number"
                        value={medicine.sales}
                        onChange={(e) =>
                          handleMedicineChange(index, "sales", e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Active In</Form.Label>
                      <Form.Control
                        type="number"
                        value={medicine.sales}
                        onChange={(e) =>
                          handleMedicineChange(index, "sales", e.target.value)
                        }
                      />
                    </Form.Group>
                  </div>
                ) : (
                  <div>
                    <div className="medicine-description">
                      {medicine.description}
                    </div>
                    <div className="medicine-use">
                      Medicinal Use: {medicine.medicinalUse}
                    </div>
                    <div className="medicine-quantity">
                      Quantity: {medicine.quantity}
                    </div>
                    <div className="medicine-sales">
                      Sales: {medicine.sales}
                    </div>
                  </div>
                )}
              </Card.Body>
              <Card.Footer>
                {/* <div
                  className="text-muted expand-button"
                  onClick={() => handleExpand(index)}
                >
                  {expandedMedicine === index ? (
                    <span>
                      Collapse
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="ml-2"
                      />
                    </span>
                  ) : (
                    <span>
                      Expand
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="ml-2"
                      />
                    </span>
                  )} 
                  </div>*/}

                <div className="edit-button">
                  <Button
                    variant="link"
                    onClick={() => handleEditMedicine(index)}
                  >
                    Edit
                    <FontAwesomeIcon icon={faEdit} className="ml-1" />
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
        <Col lg={6} md={6} sm={12}>
          <Card className="mb-4 mx-3 bg-light">
            <Card.Body className="text-center">
              <Button variant="primary" onClick={toggleMedicineForm}>
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add New Medicine
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PhShowMedicines;
