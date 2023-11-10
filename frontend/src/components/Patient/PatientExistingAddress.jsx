import React, { useState } from "react";

const addressArray = [
  ["Ahmed Oraby", 18, "3rd floor"],
  ["Lebanon Street", 10, "10th floor"],
  ["sheikh zayed",11,"4th floor"]
  // Add more address details here if needed
];

function PatientExistingAddress() {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  const handleAddressSelection = (index) => {
    setSelectedAddressIndex(index);
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
            {address[1]}, {address[0]}, {address[2]}
          </label>
        </div>
      ))}
    </div>
  );
}

export default PatientExistingAddress;
