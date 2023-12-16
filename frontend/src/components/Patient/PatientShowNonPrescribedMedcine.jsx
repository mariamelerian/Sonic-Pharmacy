import React, { useState, useEffect } from "react";
import { Card, Col, Row, Form, Spinner, Tabs, Tab ,Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle ,faSearch} from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { deleteFilterArray } from "../../state/filterMedicine";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AddToCartModal from "./AddToCartModal";
import PatientEmptyPrescribedMedicine from "./PatientEmptyPrescribedMedicine";
// import AlternativeMedicinesModal from "./AlternativeMedicinesModal";

function PatientNonPrescribedMedicine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMedicine, setExpandedMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);
  const [filterMedicinalUse, setFilterMedicinalUse] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showAlternativeModal, setShowAlternativeModal] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [expandedMedicineInModal, setExpandedMedicineInModal] = useState(null);


  const [alternativeMedicines, setAlternativeMedicines] = useState([]);
  const dispatch = useDispatch();

  const medicineImage = {
    width: "10rem",
    height: "10rem",
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

  const handleFindAlternatives = async (medicine) => {
    const matchingMedicines = medicines.filter(
      (m) =>
        m._id !== medicine._id &&
        m.activeIngredients.some(
          (ingredient) =>
            ingredient.toLowerCase() ===
            medicine.activeIngredients[0].toLowerCase()
        )
    );

    setAlternativeMedicines(matchingMedicines);
    setShowAlternatives(true);
  };

  const handleCloseAlternativeModal = () => {
    setShowAlternatives(false);
    setAlternativeMedicines([]);
  };

  const handleCloseModal = () => {
    setSelectedMedicine(null);
  };
  
  const handleExpandInModal = (index) => {
    setExpandedMedicineInModal(expandedMedicineInModal === index ? null : index);
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
        <div className="error">{error}</div>
      ) : (
        <Row>
          {medicines.map((medicine, index) => (
  <Col key={medicine.medicineName} lg={3} md={4} sm={6}>
    <Card className="mb-4 mx-3 bg-light">
      <Card.Body className="text-center">
        <div className="medicine-container">
        {medicine.quantity === 0 && (<div
      className="prescribed-label"
      style={{
        position: 'absolute', // Set position to absolute
        top: '5px', // Set distance from the top
        right: '5px', // Set distance from the right
        paddingRight:'5px',
        paddingLeft:'5px',
        paddingBottom:'5px',


        // borderColor:'lightgreen',
        // background: 'white', // Set background color
        borderRadius: '8px', // Set border-radius for curved corners
        padding: '8px', // Set padding for space inside the box
      }}
    >
            <div style={{ backgroundColor: 'white', color: 'red', border: '1px solid red', borderRadius: '5px', padding:'5px' }}>
        
        Out of Stock 
      </div>

    </div>
      )} 
          <div className="medicine-image-container">
            <img
              src={medicine.picture}
              alt={medicine.name}
              style={medicineImage}
            />
          </div>
          <div className="details-container">
            <div className="d-flex justify-content-between align-items-center mb-7 px-3">
              <div
                className="medicine-name font-weight-bold"
                style={{
                  fontSize: "24px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "120%",
                }}
              >
                {medicine.name}
              </div>
              <div
                className="expand-button"
                onClick={() => handleExpand(index)}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
              </div>
            </div>
            <div
              className="info-price-container d-flex justify-content-between align-items-center px-3"
              style={{
                color: "#777777",
                fontSize: "1rem",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "100%",
                marginBottom: "0.5rem",
              }}
            >
  <div className="medicine-price">Price: {medicine.price} LE</div>
 
</div>

            {expandedMedicine === index && (
          <>
          <div className="medicine-description" style={{ textAlign: "left", paddingLeft: "15px", display: "flex",  flexDirection: "column" }}>
       <h6 style={{ marginBottom: "5px", fontWeight: "bold" }}>Description:</h6>
       <p style={{ fontSize: "14px" }}>
         {medicine.description}
       </p>
     </div>
           <div className="medicine-use" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: "15px" }}>
             <h6 style={{ marginBottom: "5px", fontWeight: "bold" }}>Medicinal Use:</h6>
             <p style={{ fontSize: "14px" }}>
               {medicine.medicinalUse}
             </p>
           </div>

           <div className="medicine-activeIngredients" style={{ textAlign: "left", paddingLeft: "15px" }}>
             <h6 style={{ marginRight: "10px", fontWeight: "bold" }}>Active Ingredients:</h6>
             <ul
               style={{
                 listStyleType: "none",
                 paddingLeft: 0,
                 fontSize: "14px",
               }}
             >
               {medicine.activeIngredients.map((ingredient, index) => (
                 <li key={index} style={{ marginBottom: "5px" }}>
                   • {ingredient}
                 </li>
               ))}
             </ul>
           </div>
         </>
         
          
           
            )}
           {medicine.quantity === 0 ? (
            <div style={{ marginTop: '5px' }}>
               <button
            className="btn btn-primary mt-3"
            onClick={() => handleFindAlternatives(medicine)}
          >
            Find Alternatives <FontAwesomeIcon icon={faSearch} />
          </button>
            </div>
          ) : (
            <button
              className="btn btn-primary mt-3"
              onClick={() => handleAddToCart(medicine)}
              style={{
                width: "85%",
              }}
            >
              Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          )}
          </div>
        </div>
      </Card.Body>
    </Card>
  </Col>
))}
 <Modal show={showAlternatives} onHide={handleCloseAlternativeModal} dialogClassName="modal-90w">
  <Modal.Header closeButton>
    <Modal.Title>Alternative Medicines</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Row>
      {alternativeMedicines.length > 0 ? (
        alternativeMedicines
          .filter((medicine) => medicine.quantity > 0) // Filter out medicines with quantity === 0
          .map((medicine, index) => (
            <Col key={index} lg={6} md={6} sm={12}>
              <Card className="mb-4 mx-3 bg-light">
                <Card.Body className="text-center">
                  <div className="medicine-container">
                    <div className="medicine-image-container">
                      <img
                        src={medicine.picture}
                        alt={medicine.name}
                        className="img-fluid"
                      />
                    </div>
                    <div className="details-container">
                      <div className="d-flex justify-content-between mb-3 px-3">
                        {/* Move the info button to the top left */}
                        <div
                          className="expand-button"
                          onClick={() => handleExpandInModal(index)}
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            padding: "10px",
                            cursor: "pointer",
                          }}
                        >
                          <FontAwesomeIcon icon={faInfoCircle} />
                        </div>
                        <div
                          className="medicine-name font-weight-bold"
                          style={{
                            fontSize: "20px",
                            fontWeight: 700,
                            marginBottom: "0rem", // or "0.1rem" or any other value
                          }}
                        >
                          {medicine.name}
                        </div>
                      </div>
                      <div
                        className="info-price-container d-flex justify-content-between align-items-center px-3"
                        style={{
                          color: "#777777",
                          fontSize: "1rem",
                          fontWeight: 500,
                          lineHeight: "100%",
                          // marginBottom: "0.2rem", // Decreased space between name and price
                        }}
                      >
                        <div className="medicine-price">
                          
                        <strong>Price: </strong> {medicine.price} LE
                        </div>
                      </div>
                      {expandedMedicineInModal === index && (
                        <>
                        <div
                            className="info-price-container d-flex justify-content-start align-items-start px-3"
                            style={{
                              color: "#777777",
                              fontSize: "1rem",
                              fontWeight: 500,
                              lineHeight: "100%",
                              textAlign: "left",
                              marginLeft: "0", // Adjust as needed
                            }}
                          >
                            <div className="medicine-details">
                              <p style={{ marginTop: "10px",marginBottom: "10px" }}>
                                <strong>Description:</strong> {medicine.description}
                              </p>
                              <p style={{ marginBottom: "10px" }}>
                                <strong>Medicinal Use:</strong> {medicine.medicinalUse}
                              </p>
                              <strong>Active Ingredients:</strong>
                              <ul style={{ listStyleType: "none", paddingLeft: 0, fontSize: "14px" }}>
                                {medicine.activeIngredients.map((ingredient, index) => (
                                  <li key={index} style={{ marginBottom: "5px" }}>
                                    • {ingredient}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                           
                        </>
                      )}
                      {medicine.quantity > 0 && (
                        // Display button only if quantity > 0
                        <button
                          className="btn btn-primary mt-3"
                          onClick={() => handleAddToCart(medicine)}
                        >
                          Add to Cart{" "}
                          <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
      ) : (
        <p>No available alternatives with the same active ingredient.</p>
      )}
    </Row>
  </Modal.Body>
</Modal>;
        </Row>
      )}
      <AddToCartModal
        show={showModal}
        handleClose={handleCloseModal}
        itemName={selectedMedicine?.name}
      />

      {/* Add the AlternativeMedicinesModal component */}
      {/* <AlternativeMedicinesModal
        show={showAlternativeModal}
        handleClose={handleCloseAlternativeModal}
        alternativeMedicines={alternativeMedicines}
      /> */}
    </div>
  );
}

export default PatientNonPrescribedMedicine;