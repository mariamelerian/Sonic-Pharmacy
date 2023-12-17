import React, { useEffect, useState } from "react";
import { Card, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MedicineForm from "./PhNewMedicine";
import {
  faPlus,
  faPenToSquare,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { deleteFilterArray } from "../../state/filterMedicine";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AddMedicineModal from "./PhNewMedicineModal";

function PhShowArchivedMedicine({
  responseData,
  setResponseData,
  error,
  setError,
  loading,
  setLoading,
  fetchData,
  flag,
  onBroadcast,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editedMedicine, setEditedMedicine] = useState(null);
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const filterMedicinalUse = useSelector(
    (state) => state.filterMedicine.medicinalUse
  );
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [medicinalUse, setMedicinalUse] = useState(null);
  const [activeIngredients, setActiveIngredients] = useState(null);
  const [, setFilterMedicinalUse] = useState("");
  const [expandedMedicine, setExpandedMedicine] = useState(null);
  const dispatch = useDispatch();

  const medicineImage = {
    width: "10rem",
    height: "10rem",
  };

  useEffect(() => {
    fetchData();
  }, [flag]);

  useEffect(() => {
    // fetchData();
    dispatch(
      deleteFilterArray({
        medicinalUse: "",
      })
    );
    setEditedMedicine(null);
  }, []);

  const medicines = responseData;

  const handleUnarchiveMedicine = async (med) => {
    try {
      const response = await axios.put("/unarchiveMedicine", { id: med });

      if (response.status === 200) {
        fetchData();
        onBroadcast();
      } else if (response.status === 404) {
        setError("Medicine not found");
      } else {
        setError("Error");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Medicine not found");
      } else {
        setError(
          "An error occurred while updating medicine. Please try again later"
        );
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      medicine.medicinalUse.includes(filterMedicinalUse)
  );

  const toggleMedicineForm = () => {
    setShowMedicineForm();
  };

  const onClose = () => {
    setShowMedicineForm(false);
  };

  const handleEditMedicine = (index) => {
    setEditedMedicine(index);
  };

  const saveMedicine = async (id) => {
    const medicineToUpdate = medicines[editedMedicine];
    const activeIngredientsArray = activeIngredients
      ? activeIngredients.split("-")
      : null;
    const queryParameters = new URLSearchParams({
      _id: id,
      name: medicineToUpdate.name,
      price: price || medicineToUpdate.price,
      description: description || medicineToUpdate.description,
      medicinalUse: medicinalUse || medicineToUpdate.medicinalUse,
      quantity: quantity || medicineToUpdate.quantity,
      activeIngredients:
        activeIngredientsArray || medicineToUpdate.activeIngredients,
    }).toString();
    const url = `/updateMedicine?${queryParameters}`;
    try {
      const response = await axios.put(url, null);
      if (response.status === 200) {
        fetchData();
      } else if (response.status === 404) {
        setError("Medicine not found");
      } else {
        setError("Error");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Medicine not found");
      } else {
        setError(
          "An error occurred while updating medicine. Please try again later"
        );
      }
    }
    setEditedMedicine(null);
    setPrice(null);
    setMedicinalUse(null);
    setDescription(null);
    setQuantity(null);
  };

  const handleExpand = (index) => {
    setFilterMedicinalUse(""); // Reset the filter when expanding a medicine
    setExpandedMedicine(expandedMedicine === index ? null : index);
  };

  return (
    <div>
      {showMedicineForm && (
        <AddMedicineModal fetchData={fetchData} onClose={onClose} />
      )}

      <Form className="my-4 mx-3 w-100">
        <Form.Control
          type="text"
          placeholder="Search Medicines"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: "72%", marginBottom: "3.5rem", marginTop: "2.5rem" }}
        />
      </Form>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {filteredMedicines.map((medicine, index) => (
            <Col key={medicine.name} lg={3} md={4} sm={6}>
              <Card className="mb-4 mx-3 bg-light">
                <Card.Body>
                  <div className="d-flex justify-content-end">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{
                        opacity: 1,
                        color: "#099BA0 ",
                        fontSize: "20px",
                        cursor: "pointer",
                        marginBottom: "5px",
                      }}
                      onClick={() => handleEditMedicine(index)}
                    />
                  </div>
                  <div className="medicine-image-container">
                    <img
                      src={medicine.picture}
                      alt={medicine.name}
                      style={{
                        width: "10rem",
                        height: "10rem",
                        margin: "0 auto", // Center the image horizontally
                        display: "block",
                      }}
                    />
                  </div>
                  <div className="details-container">
                    <div className="d-flex justify-content-between align-items-center mb-7 px-4">
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
                        // onClick={() => toggleMedicineDetails(index)}
                      >
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </div>
                  {editedMedicine === index ? (
                    <div style={{ paddingLeft: "20px" }}>
                      <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={medicine.price}
                          name={medicine.price}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d*\.?\d*$/.test(inputValue)) {
                              setPrice(inputValue);
                            }
                          }}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder={medicine.description}
                          name={medicine.description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Medicinal Use</Form.Label>
                        <Form.Control
                          as="select"
                          name="medicinalUse"
                          onChange={(e) => setMedicinalUse(e.target.value)}
                        >
                          <option value={medicine.medicinalUse}>
                            {medicine.medicinalUse}
                          </option>
                          <option value="Pain Relief">Pain Relief</option>
                          <option value="Fever Relief">Fever Relief</option>
                          <option value="Allergy Relief">Allergy Relief</option>
                          <option value="Digestive Health">
                            Digestive Health
                          </option>
                          <option value="Respiratory Relief">
                            Respiratory Relief
                          </option>
                          <option value="Anxiety Relief">Anxiety Relief</option>
                          <option value="Cholesterol Management">
                            Cholesterol Management
                          </option>
                          <option value="Diabetes Management">
                            Diabetes Management
                          </option>
                          <option value="Infection Treatment">
                            Infection Treatment
                          </option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Active Ingredients</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder={medicine.activeIngredients}
                          name={medicine.activeIngredients}
                          onChange={(e) => setActiveIngredients(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder={medicine.quantity}
                          name={medicine.quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  ) : (
                    <div>
                      <div className="medicine-price px-4">
                        <span>Price:</span> ${medicine.price}
                      </div>

                      {expandedMedicine === index && (
                        <>
                          <div className="medicine-description px-4">
                            <strong>Description:</strong> {medicine.description}
                          </div>
                          <div className="medicine-use px-4">
                            <strong>Medicinal Use:</strong>{" "}
                            {medicine.medicinalUse}
                          </div>
                          <div className="medicine-activeIngredients px-4">
                            <strong>Active Ingredients:</strong>{" "}
                            {medicine.activeIngredients.map(
                              (ingredient, index) => (
                                <div
                                  key={index}
                                  style={{ marginBottom: "5px" }}
                                >
                                  • {ingredient}
                                </div>
                              )
                            )}
                          </div>
                          <div className="medicine-quantity px-4">
                            <strong>Quantity:</strong> {medicine.quantity}
                          </div>
                          <div className="medicine-sales px-4">
                            <strong>Sales:</strong> ${medicine.sales}
                          </div>
                        </>
                      )}
                      <div
                        className="d-flex justify-content-center"
                        style={{
                          width: "100%",
                        }}
                      >
                        <button
                          className="btn btn-primary mt-3"
                          onClick={() => handleUnarchiveMedicine(medicine._id)}
                          style={{ marginBottom: "1rem", width: "12rem" }}
                        >
                          Unarchive Medicine
                        </button>
                      </div>
                    </div>
                  )}
                </Card.Body>

                {editedMedicine === index && (
                  <Card.Footer>
                    <div
                      className="d-flex align-items-center justify-content-center"
                      onClick={() => saveMedicine(medicine._id)}
                    >
                      <Button>Save Changes</Button>
                    </div>
                  </Card.Footer>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default PhShowArchivedMedicine;
