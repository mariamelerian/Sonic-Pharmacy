import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Tab, Tabs } from "react-bootstrap";

function PatientCheckOutModal() {
  const [showModal, setShowModal] = useState(true);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");

  const handleClose = () => {
    setShowModal(false);
    setSelectedMedicine(null);
    setPaymentMethod("wallet");
    setCreditCard({ cardNumber: "", expirationDate: "", cvv: "" });
    setDeliveryAddress("");
    setUseExistingAddress(false);
    setBookingStatus("");
  };

  const handleBookMedicine = () => {
    // Perform booking logic here
    // You can use the selectedMedicine, bookingName, paymentMethod, creditCard, and deliveryAddress states to submit the booking request
    // Update the bookingStatus state accordingly
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    setCreditCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeliveryAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const handleExistingAddressChange = () => {
    setUseExistingAddress(!useExistingAddress);
  };

  const handleAddNewAddress = () => {
    // Add logic for handling the addition of a new address
    // You can use the value of the new address from the state (deliveryAddress)
    // Update the state or perform any other necessary actions
    console.log("Add new address logic goes here");
  };

  const totalTextStyle = {
    fontWeight: 'bold',
    fontSize: '1.5em', // Adjust the font size as needed
  };

//   const subHeaderTextStyle = {
//     fontWeight: 'bold',
//     fontSize: '1em', // Adjust the font size as needed
//   };
  // Hardcoded array of medicine details
  const medicineDetails = [
    {
      id: 1,
      name: "Medicine 1",
      price: 10,
      location: "Pharmacy 1",
    },
    {
      id: 2,
      name: "Medicine 2",
      price: 20,
      location: "Pharmacy 2",
    },
    {
      id: 3,
      name: "Medicine 3",
      price: 15,
      location: "Pharmacy 3",
    },
  ];

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Medicine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bookingStatus === "success" ? (
          <p>You have successfully ordered the medicine.</p>
        ) : (
          <Tabs defaultActiveKey="paymentSummary" id="orderTabs" className="mb-3">
            <Tab eventKey="paymentSummary" title="Payment Summary">
              {/* Payment Summary Section */}
              <div>
                <p>Subtotal: {/* Calculate and display subtotal here */}</p>
                <p>Delivery Fees: {/* Calculate and display delivery fees here */}</p>
                <p style={totalTextStyle}>Total: {/* Calculate and display total here */}</p>
              </div>
            </Tab>
            <Tab eventKey="paymentMethod" title="Payment Method">
              <Form>
                <Form.Group controlId="paymentMethod">
                  <Form.Label style={totalTextStyle}>Payment Method</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Wallet"
                    name="paymentMethod"
                    value="wallet"
                    checked={paymentMethod === "wallet"}
                    onChange={handlePaymentMethodChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Credit Card"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentMethod === "creditCard"}
                    onChange={handlePaymentMethodChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Cash on Delivery"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={paymentMethod === "cashOnDelivery"}
                    onChange={handlePaymentMethodChange}
                  />
                </Form.Group>
                {paymentMethod === "creditCard" && (
                  <div>
                    <Form.Group controlId="creditCardNumber">
                      <Form.Label >Credit Card Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter credit card number"
                        name="cardNumber"
                        value={creditCard.cardNumber}
                        onChange={handleCreditCardChange}
                      />
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={4}>
                        Expiration Date
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          placeholder="MM/YYYY"
                          name="expirationDate"
                          value={creditCard.expirationDate}
                          onChange={handleCreditCardChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group controlId="cvv">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter CVV"
                        name="cvv"
                        value={creditCard.cvv}
                        onChange={handleCreditCardChange}
                      />
                    </Form.Group>
                  </div>
                )}
              </Form>
            </Tab>
            <Tab eventKey="address" title="Address">
  <Form>
    <Form.Group controlId="addressOptions">
      <Form.Label style={totalTextStyle}>Address </Form.Label>
      <Form.Check
        type="radio"
        label="Add New Address"
        name="addressOptions"
        value="newAddress"
        checked={!useExistingAddress}
        onChange={() => setUseExistingAddress(false)}
      />
      <Form.Check
        type="radio"
        label="Choose Existing Address"
        name="addressOptions"
        value="existingAddress"
        checked={useExistingAddress}
        onChange={() => setUseExistingAddress(true)}
      />
    </Form.Group>
    {useExistingAddress ? (
      <div>
        {/* Render existing addresses here */}
        <p>Existing Addresses:</p>
        <div className="existing-addresses">
          {["Address 1", "Address 2", "Address 3"].map((address, index) => (
            <div
              key={index}
              className={`existing-address ${deliveryAddress === address ? "selected-address" : ""}`}
              onClick={() => setDeliveryAddress(address)}
              style={{ color: deliveryAddress === address ? "blue" : "black" }}
            >
              {address}
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div>
        {/* Render form for new address */}
        <Form.Group controlId="deliveryAddress">
          <Form.Label>New Delivery Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter new delivery address"
            value={deliveryAddress}
            onChange={handleDeliveryAddressChange}
          />
        </Form.Group>
        {/* Add teal button for adding new address */}
        <Button
  variant="info"
  onClick={handleAddNewAddress}
  className="mb-3"
  style={{ backgroundColor: '#05afb9', borderColor: '#05afb9', color:'#ffffff' }}
>
  Add Address
</Button>
      </div>
    )}
  </Form>
</Tab>
          </Tabs>
        )}
      </Modal.Body>
      <Modal.Footer>
  {bookingStatus === "success" ? (
    <Button variant="success" onClick={handleClose}>
      Close
    </Button>
  ) : (
    <div>
      <Button variant="success" onClick={handleBookMedicine} style={{ marginRight: '10px' }}>
        Order
      </Button>
      <Button variant="danger" onClick={handleClose}>
        Cancel
      </Button>
    </div>
  )}
</Modal.Footer>
    </Modal>
  );
}

export default PatientCheckOutModal;
