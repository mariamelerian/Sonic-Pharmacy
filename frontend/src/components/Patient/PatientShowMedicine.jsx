import React, { useState, useEffect } from "react";
import { Card, Col, Row, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { deleteFilterArray } from "../../state/filterMedicine";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function PatientShowMedicine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMedicine, setExpandedMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);
  const filterMedicinalUse = useSelector(
    (state) => state.filterMedicine.medicinalUse
  );
  const dispatch = useDispatch();

  const medicineImage = {
    width: "15rem",
    height: "15rem",
  };

  useEffect(() => {
    fetchData();
    dispatch(
      deleteFilterArray({
        medicinalUse: "",
      })
    );
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
  const medicines = responseData;

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

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      medicine.medicinalUse.includes(filterMedicinalUse)
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
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <Row>
          {filteredMedicines.map((medicine, index) => (
            <Col key={medicine.medicineName} lg={6} md={6} sm={12}>
              <Card className="mb-4 mx-3 bg-light">
                <Card.Header className="text-center">
                  {medicine.name}
                </Card.Header>
                <Card.Body className="text-center">
                  <div className="medicine-image-container">
                    <img
                      src={medicine.picture}
                      alt={medicine.name}
                      style={medicineImage}
                    />
                  </div>
                  <div className="medicine-price">
                    Price: {medicine.price} LE
                  </div>
                  {expandedMedicine === index ? (
                    <>
                      <div className="medicine-description">
                        <h6>Description</h6>
                        <p>{medicine.description}</p>
                      </div>
                      <hr />
                      <div className="medicine-use">
                        <h6>Medicinal Use</h6>
                        <p>{medicine.medicinalUse}</p>
                      </div>
                      <hr />
                      <div className="medicine-activeIngredients">
                        Active Ingredients:{" "}
                        {medicine.activeIngredients.map((ingredient, index) => (
                          <div key={index} style={{ marginBottom: "5px" }}>
                            • {ingredient}
                          </div>
                        ))}
                      </div>
                      <hr />
                      <button className="btn btn-primary" onClick={() => alert('This item has been added to your cart')}>
  Add to Cart
</button>


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
      )}
    </div>
  );
}

export default PatientShowMedicine;
