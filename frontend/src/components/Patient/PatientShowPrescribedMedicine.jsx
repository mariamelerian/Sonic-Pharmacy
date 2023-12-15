import React, { useState, useEffect } from "react";
import { Card, Col, Row, Form, Spinner, Tabs, Tab  } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle ,faSearch} from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { deleteFilterArray } from "../../state/filterMedicine";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AddToCartModal from "./AddToCartModal";
import PatientEmptyPrescribedMedicine from "./PatientEmptyPrescribedMedicine";
import AlternativeMedicinesModal from "./AlternativeMedicinesModal";

function PatientPrescribedMedicine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMedicine, setExpandedMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);
  const [filterMedicinalUse, setFilterMedicinalUse] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showAlternativeModal, setShowAlternativeModal] = useState(false);
  const [alternativeMedicines, setAlternativeMedicines] = useState([]);
  const dispatch = useDispatch();

  const medicineImage = {
    width: "14rem",
    height: "14rem",
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
    setShowAlternativeModal(true);
  };

  const handleCloseAlternativeModal = () => {
    setShowAlternativeModal(false);
    setAlternativeMedicines([]);
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
        <div className="error">{error}</div>
      ) : (
        <Row>
          {medicines.map((medicine, index) => (
  <Col key={medicine.medicineName} lg={4} md={4} sm={12}>
    <Card className="mb-4 mx-3 bg-light">
      <Card.Body className="text-center">
        <div className="medicine-container">
         {/* Add the "Prescribed" label with a box */}
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
            <div className="d-flex justify-content-between align-items-center mb-7 px-5">
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
              className="info-price-container d-flex justify-content-between align-items-center px-5"
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
 <div>Prescribed</div>
</div>


            {expandedMedicine === index && (
           <>
          <div className="medicine-description" style={{ textAlign: "left", paddingLeft: "50px", display: "flex", alignItems: "center" }}>
  <h6 style={{ marginRight: "10px" , fontWeight: "bold" }}>Description:</h6>
  <p style={{ marginBottom: "5px", fontSize: "14px" }}>
    {medicine.description}
  </p>
</div>
<div className="medicine-use" style={{ textAlign: "left", paddingLeft: "50px", display: "flex", alignItems: "center" }}>
  <h6 style={{ marginRight: "10px", fontWeight: "bold" }}>Medicinal Use:</h6>
  <p style={{ marginBottom: "5px", fontSize: "14px" }}>
    {medicine.medicinalUse}
  </p>
</div>

           <div className="medicine-activeIngredients" style={{ textAlign: "left", paddingLeft: "50px" }}>
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
        </Row>
      )}
      <AddToCartModal
        show={showModal}
        handleClose={handleCloseModal}
        itemName={selectedMedicine?.name}
      />

      {/* Add the AlternativeMedicinesModal component */}
      <AlternativeMedicinesModal
        show={showAlternativeModal}
        handleClose={handleCloseAlternativeModal}
        alternativeMedicines={alternativeMedicines}
      />
    </div>
  );
}

export default PatientPrescribedMedicine;