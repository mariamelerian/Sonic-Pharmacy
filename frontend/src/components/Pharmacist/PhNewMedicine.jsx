import { useState } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";

function MedicineForm({ onClose, fetchData }) {
  const [medicineName, setMedicineName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [medicinalUse, setMedicinalUse] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [sales, setSales] = useState(null);
  //const [picture, setPicture] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // New state variable for the selected image file

  const handleSave = async (e) => {
    console.log("wselt henaaaa");
    e.preventDefault();
    setError(null);
    if (
      medicineName == null ||
      price == null ||
      description == null ||
      medicinalUse == null ||
      quantity == null ||
      sales == null ||
      ingredients == null
    ) {
      setError("Please fill in all the required fields");
      return;
    }

    try {
      onClose();
      const activeIngredientsArray = ingredients.split("-");
      const response = await axios.post("/newMedicine", {
        picture: selectedImage,
        name: medicineName,
        price: price,
        description: description,
        quantity: quantity,
        sales: sales,
        activeIngredients: activeIngredientsArray,
        medicinalUse: medicinalUse,
      });

      if (response.status === 200) {
        console.log("here");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false); // Clear the error after 5 seconds
        }, 5000);
        fetchData();
      } else if (response.status === 500) {
        setError("Medicine not found");
      } else {
        setError("Error");
      }
    } catch (error) {
      setSuccess(false);
      if (error.response && error.response.status === 500) {
        setError("Server error");
      } else {
        setError(error.response.status);
      }
    }
    setTimeout(() => {
      setError(null); // Clear the error after 5 seconds
    }, 5000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <Card className="mb-4 mx-3 bg-light">
      <Card.Header className="text-center">Add New Medicine</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Medicine Name</Form.Label>
            <Form.Control
              type="text"
              name="medicineName"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Medicinal Use</Form.Label>
            <Form.Control
              as="select"
              name="medicinalUse"
              value={medicinalUse}
              onChange={(e) => setMedicinalUse(e.target.value)}
            >
              <option value="">Select Medicinal Use</option>
              <option value="Pain Relief">Pain Relief</option>
              <option value="Fever Relief">Fever Relief</option>
              <option value="Allergy Relief">Allergy Relief</option>
              <option value="Digestive Health">Digestive Health</option>
              <option value="Respiratory Relief">Respiratory Relief</option>
              <option value="Anxiety Relief">Anxiety Relief</option>
              <option value="Cholesterol Management">
                Cholesterol Management
              </option>
              <option value="Diabetes Management">Diabetes Management</option>
              <option value="Infection Treatment">Infection Treatment</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Active Ingredients</Form.Label>
            <Form.Control
              type="text"
              name="medicinalUse"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </Form.Group>
         
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Sales</Form.Label>
            <Form.Control
              type="number"
              name="sales"
              value={sales}
              onChange={(e) => setSales(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageUpload}
            />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" onClick={handleSave}>
            Save
          </Button>
          {/* <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button> */}
        </div>
        {error && (
          <div
            style={{
              marginTop: "2rem",
              backgroundColor: "#f44336", // Red background color
              color: "white", // White text color
              padding: "10px", // Padding around the message
              borderRadius: "5px", // Rounded corners
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Box shadow for a subtle effect
            }}
          >
            {error}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
export default MedicineForm;
