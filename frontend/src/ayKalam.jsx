import React, { useState } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import doctorImg from "../../Assets/Patient/Doctor.jpg";
import MedicineForm from "./PhNewMedicine";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function PhShowMedicines() {
  const Medicines = [
    {
      medicineName: "Medicine 1",
      price: 9.99,
      description: "This is the description for Medicine 1.",
      medicinalUse: "Medicinal use for Medicine 1.",
      image: doctorImg,
      quantity: 100,
      sales: 50,
    },
    {
      medicineName: "Medicine 2",
      price: 19.99,
      description: "This is the description for Medicine 2.",
      medicinalUse: "Medicinal use for Medicine 2.",
      image: doctorImg,
      quantity: 200,
      sales: 150,
    },
    // Add more medicine objects as needed
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [_id, set_Id] = useState(id);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sales, setSales] = useState("");
  const [quantity, setQuantity] = useState("");
  const [activeIngredients, setActiveIngredients] = useState("");
  const [medicinalUse, setMedicinalUse] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  //const [expandedMedicine, setExpandedMedicine] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const handleExpand = (index) => {
  //   if (expandedMedicine === index) {
  //     setExpandedMedicine(null);
  //   } else {
  //     setExpandedMedicine(index);
  //   }
  // };

  //search
  const filteredMedicines = Medicines.filter((medicine) =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showMedicineForm, setShowMedicineForm] = useState(false);

  const toggleMedicineForm = () => {
    setShowMedicineForm(!showMedicineForm);
  };

  const onCancel = () => {
    setShowMedicineForm(false);
  };

  const handleEditMedicine = (index) => {
    setEditedMedicine(index);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // const handleMedicineChange = (index, field, value) => {
  //   const updatedMedicines = [...Medicines];
  //   updatedMedicines[index][field] = value;
  //   setEditedMedicine(updatedMedicines);
  // };

  const handleSaveClick = () => {
    // validations
    actuallyUpdate();
    setIsEditing(false);
  };

  const actuallyUpdate = async () => {
    const config = {
      headers: {
        id: id,
      },
    };
    try {
      const response = await axios.put(
        "http:localhost:8000/updateMedicine",
        {
          name: name,
          price: price,
          description: description,
          quantity: quantity,
          sales: sales,
          activeIngredients: activeIngredients,
          medicinalUse: medicinalUse,
        },
        config
      );

      if (response.status === 200) {
        console.log("tmam");
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
    setTimeout(() => {
      setError(null); // Clear the error after 5 seconds
    }, 5000);
  };

  return (
    <div>
      {showMedicineForm && <MedicineForm onCancel={onCancel} />}
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
          <Col key={medicine.medicineName} lg={6} md={6} sm={12}>
            <Card className="mb-4 mx-3 bg-light">
              {
                <Card.Header className="text-center">
                  Medicine Name: {medicine.medicineName}
                </Card.Header>
              }
              <Card.Body className="text-center">
                <div className="medicine-image-container">
                  <img
                    src={medicine.image}
                    alt={medicine.medicineName}
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
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        value={medicine.price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={medicine.description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Medicinal Use</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={medicine.medicinalUse}
                        onChange={(e) => setMedicinalUse(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        value={medicine.quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </Form.Group>
                    {/* <Form.Group>
                      <Form.Label>Sales</Form.Label>
                      <Form.Control
                        type="number"
                        value={medicine.sales}
                        onChange={(e) =>
                          setSales(e.target.value)
                        }
                      />
                    </Form.Group> */}
                    <Button
                      variant="primary"
                      className="mr-2"
                      onClick={() => handleSaveMedicine(index)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditedMedicine(null)}
                    >
                      Cancel
                    </Button>
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
