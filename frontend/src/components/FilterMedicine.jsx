import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setFilterArray, deleteFilterArray } from "../state/filterMedicine";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function FilterMedicine({ onFilter }) {
  const [selectedMedicinalUse, setSelectedMedicinalUse] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/medicinalUses");
      if (response.status === 200) {
        setResponseData(response.data);
      } else {
        setError("Server error");
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
    }
  };
  const medicinalUseArray = responseData;

  const handleFilter = () => {
    if (selectedMedicinalUse === "") {
      dispatch(
        deleteFilterArray({
          medicinalUse: "",
        })
      );
    } else {
      dispatch(
        setFilterArray({
          medicinalUse: selectedMedicinalUse,
        })
      );
    }
  };

  return (
    <Container
      style={{
        flexShrink: 0,
        width: "60%", // Adjusted width for a smaller container
        // marginLeft: 0,
        border: "1px solid var(--gray-400, #ced4da)",
        background: "var(--gray-white, #fff)",
        padding: "0.5rem", // Adjusted padding to make it thinner
        marginBottom: "2rem",
      }}
    >
      <Row style={{ justifyContent: "flex-start" }}>
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
            Filter Medicine
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
            Medicinal Use
          </div>

          <div style={{ position: "relative" }}>
            <Form.Control
              as="select"
              onChange={(e) => setSelectedMedicinalUse(e.target.value)}
              style={{ width: "100%" }} // Adjusted width
            >
              <option value="">Select medicinal use</option>
              {medicinalUseArray.map((use, index) => (
                <option key={index} value={use}>
                  {`${use}`}
                </option>
              ))}
            </Form.Control>
            <FontAwesomeIcon
              icon={faAngleDown}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                color: "#555", // Adjust the color as needed
              }}
            />
          </div>
        </Col>
        <Col xs={12} md={3} className="d-flex align-items-end">
          <Button
            className="custom-button w-100"
            onClick={handleFilter}
            style={{
              height: "38px", // Adjusted height
              marginLeft: "0.5rem", // Adjusted margin-left for spacing
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

export default FilterMedicine;
