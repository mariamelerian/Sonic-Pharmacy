import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";

function FilterForTotalSalesParm({ onFilter }) {
  const [selectedMonth, setSelectedMonth] = useState("");

  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  



  const handleFilter = () => {
    //TODO: send to backend
  };

  return (
    <Container
    className="mx-auto"
      style={{
        flexShrink: 0,
        width: "82%",
        border: "1px solid var(--gray-400, #ced4da)",
        background: "var(--gray-white, #fff)",
        padding: "0.5rem", // Adjusted padding to make it thinner
        marginLeft: "1.3rem",
      }}
    >
      <Row>
        <Col xs={12} md={9}>
          <div
            style={{
              fontSize: "18px", // Adjusted font size
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "120%",
              marginBottom: "0.5rem", // Adjusted margin
            }}
          >
            Filter Sales Report
          </div>

          <div
            style={{
              color: "#099BA0 ",
              fontSize: "1rem", // Adjusted font size
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "100%",
              marginBottom: "0.5rem", // Adjusted margin
            }}
          >
            Month
          </div>

          <Form.Control
            as="select"
            onChange={(e) => setSelectedMonth(e.target.key)}
            style={{ width: "100%" }} // Adjusted width
          >
            <option value="">Select Month</option>
            {months.map((use, index) => (
              <option key={index} value={use}>
                {`${use}`}
              </option>
            ))}
          </Form.Control>

          <div
            style={{
              color: "#099BA0 ",
              fontSize: "1rem", // Adjusted font size
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "100%",
              marginBottom: "0.5rem", // Adjusted margin
            }}
          >
            Medicine
          </div>

          <Form.Control
            as="select"
            onChange={(e) => setSelectedMonth(e.target.key)}
            style={{ width: "100%" }} // Adjusted width
          >
            <option value="">Select Medicine</option>
            {months.map((use, index) => (
              <option key={index} value={use}>
                {`${use}`}
              </option>
            ))}
          </Form.Control>

          <div
            style={{
              color: "#099BA0 ",
              fontSize: "1rem", // Adjusted font size
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "100%",
              marginBottom: "0.5rem", // Adjusted margin
            }}
          >
            Date
          </div>

          <Form.Control
            as="select"
            onChange={(e) => setSelectedMonth(e.target.key)}
            style={{ width: "100%" }} // Adjusted width
          >
            <option value="">Select Date</option>
            {months.map((use, index) => (
              <option key={index} value={use}>
                {`${use}`}
              </option>
            ))}
          </Form.Control>

        </Col>
        
        <Col xs={12} md={3} className="d-flex align-items-end">
  <Button
    className="custom-button"
    onClick={handleFilter}
    style={{
      height: "38px", // Adjusted height
      marginLeft: "150px", // Adjusted margin-left
      fontSize: "14px", // Adjusted font size
    }}
  >
    Apply
  </Button>
</Col>
      </Row>
    </Container>
  );
}

export default FilterForTotalSalesParm;
