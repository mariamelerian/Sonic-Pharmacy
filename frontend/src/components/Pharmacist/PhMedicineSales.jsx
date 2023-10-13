import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import doctorImg from "../../Assets/Patient/Doctor.jpg";
import axios from "axios";

function PhMedicineSales() {
  const [medicines, setMedicines] = useState([]);
  const [error1, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/medicines");
      if (response.status === 200) {
        setMedicines(response.data);
      } else {
        console.log("Server error");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("No medicines found.");
      } else if (error.response && error.response.status === 500) {
        setError("Server Error");
      }
    }
  };

  return (
    <div>
      <Row>
        {medicines.map((medicine) => (
          <Col key={medicine.medicineName} lg={6} md={6} sm={12}>
            <Card className="mb-4 mx-3 bg-light">
              <Card.Header className="text-center">
                Medicine Name: {medicine.name}
              </Card.Header>
              <Card.Body className="text-center">
                <div className="medicine-image-container">
                  <img
                    src={medicine.photo}
                    alt={medicine.photo}
                    className="medicine-image"
                  />
                </div>
                <div className="medicine-price">Price: ${medicine.price}</div>
                <div className="medicine-price">
                  Quantity: {medicine.quantity} box
                </div>
                <div className="medicine-price">Sales: ${medicine.sales}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PhMedicineSales;
