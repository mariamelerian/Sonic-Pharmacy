import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setFilterArray, deleteFilterArray } from "../state/filterMedicine";
import axios from "axios";

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
        height: "fit-content",
        flexShrink: 0,
        width: "80%",
        borderRadius: "2.5625rem 2.5625rem 3.25rem 3.25rem",
        border: "1px solid var(--gray-400, #ced4da)",
        background: "var(--gray-white, #fff)",
        padding: "1.6rem",
        marginLeft: "2.2rem",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "120%",
          marginBottom: "1rem",
        }}
      >
        Filter Medicine
      </div>

      <div className="mb-2">
        <div
          style={{
            color: "#099BA0 ",
            fontSize: "1.1rem",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "100%",
            marginBottom: "1rem",
          }}
        >
          Medicinal Use
        </div>
        <Form.Control
          as="select"
          onChange={(e) => setSelectedMedicinalUse(e.target.value)}
        >
          <option value="">Select medicinal use</option>
          {medicinalUseArray.map((use, index) => (
            <option key={index} value={use}>
              {`${use}`}
            </option>
          ))}
        </Form.Control>
      </div>

      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
      >
        <Button className="custom-button" onClick={handleFilter}>
          Apply
        </Button>
      </Container>
    </Container>
  );
}

export default FilterMedicine;
