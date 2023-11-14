import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormInput from "../../forms/FormInput";

const PatientNewAddressForm = ({ textStyle }) => {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [streetName, setStreetName] = useState("");
  const [buildingNum, setBuildingNum] = useState("");
  const [floor, setFloor] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form submission here, for example, sending the data to a server.
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // You can add validation logic here if needed.

    // Perform further actions, e.g., sending data to the server.
    const address =
      country +
      " " +
      city +
      " " +
      streetName +
      " " +
      buildingNum +
      " " +
      floor +
      " " +
      postalCode;

    try {
      const response = await axios.post("/newPatientAddress", {
        address: address,
      });
      if (response.status === 200) {
        setError("Address Added successfully");
        setLoading(false);
        navigate("/patient");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Please fill in all the required fields");
      } else if (error.response && error.response.status === 500) {
        setError("Server Error");
      }
    }
  };

  return (
    <div className="col-9 form-container">
      <div className="form-title">Add Delivery Address</div>
      <Form className="rounded-3" onSubmit={handleSubmit}>
        <FormInput
          name="Country"
          type="text"
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <FormInput
          name="City"
          type="text"
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        />
        <FormInput
          name="Street Name"
          type="text"
          placeholder="Street Name"
          onChange={(e) => setStreetName(e.target.value)}
        />
        <FormInput
          name="Building Number"
          type="text"
          placeholder="Building Number"
          onChange={(e) => setBuildingNum(e.target.value)}
        />
        <FormInput
          name="Floor"
          type="text"
          placeholder="Floor"
          onChange={(e) => setFloor(e.target.value)}
        />
        <FormInput
          name="Postal Code"
          type="text"
          placeholder="Postal Code"
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <button
          className="w-100 btn-sm custom-button"
          disabled={loading}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          Add Delivery Address
        </button>
        {error && <div className="error">{error}</div>}
      </Form>
    </div>
  );
};

export default PatientNewAddressForm;
