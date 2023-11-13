import React, { useState, useEffect } from "react";
import { Card, Col, Row, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { deleteFilterArray } from "../../state/filterMedicine";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AddToCartModal from "./AddToCartModal"; // Import the modal component

function PatientShowMedicine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMedicine, setExpandedMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);
  const [filterMedicinalUse, setFilterMedicinalUse] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExpand = (index) => {
    setFilterMedicinalUse(""); // Reset the filter when expanding a medicine
    setExpandedMedicine(expandedMedicine === index ? null : index);
  };

  const handleAddToCart = async (medicine) => {
    setSelectedMedicine(medicine);
    try {
      const response = await axios.put(`/addtocart/${medicine._id}`);
      if (response.status === 200) {
        setError(null);
      } else {
        setError("Error");
      }
    } catch (error) {
      setError(
        "An error occurred while adding to cart. Please try again later"
      );
    }
    setSelectedMedicine(null);
  };

  const handleCloseModal = () => {
    setSelectedMedicine(null);
  };

  const medicines = responseData;
  const showModal = !!selectedMedicine;

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
          {medicines.map((medicine, index) => (
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
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(medicine)}
                      >
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
      <AddToCartModal
        show={showModal}
        handleClose={handleCloseModal}
        itemName={selectedMedicine?.name}
      />
    </div>
  );
}

export default PatientShowMedicine;
