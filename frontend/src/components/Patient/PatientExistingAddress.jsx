import React, { useState, useEffect } from "react";
import axios from "axios";

function PatientExistingAddress() {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [addressArray, setAddressArray] = useState([]);

  const handleAddressSelection = (index) => {
    setSelectedAddressIndex(index);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/patientAddresses");

      if (response.status === 200) {
        await setAddressArray(response.data);
      } else {
        console.log("Server error");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        await setAddressArray(["No Adresses Found"]);
      } else if (error.response && error.response.status === 500) {
        await setAddressArray(["Server error"]);
      }
    }
  };

  return (
    <div>
      {addressArray.map((address, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              name="addressSelection"
              checked={selectedAddressIndex === index}
              onChange={() => handleAddressSelection(index)}
            />
            {address}
          </label>
        </div>
      ))}
    </div>
  );
}

export default PatientExistingAddress;
