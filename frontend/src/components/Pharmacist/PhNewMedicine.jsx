import { useState } from "react";
import {Card,Form, Button} from "react-bootstrap"
function MedicineForm({ onSave, onCancel }) {
    const [medicineDetails, setMedicineDetails] = useState({
      medicineName: "",
      price: "",
      description: "",
      medicinalUse: "",
      image: "",
      quantity: "",
      sales: "",
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setMedicineDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    };
  
    const handleSave = () => {
      onSave(medicineDetails);
      setMedicineDetails({
        medicineName: "",
        price: "",
        description: "",
        medicinalUse: "",
        image: "",
        quantity: "",
        sales: "",
      });
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
                value={medicineDetails.medicineName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={medicineDetails.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={medicineDetails.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Medicinal Use</Form.Label>
              <Form.Control
                type="text"
                name="medicinalUse"
                value={medicineDetails.medicinalUse}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={medicineDetails.image}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={medicineDetails.quantity}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sales</Form.Label>
              <Form.Control
                type="number"
                name="sales"
                value={medicineDetails.sales}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-end">
            <Button className="mr-2" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
  export default MedicineForm;