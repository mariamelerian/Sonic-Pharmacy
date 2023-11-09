import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import PatientMyOrdersCard from "./PatientMyOrdersCard";

export default function PatientMyOrders() {
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [error1, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/pharmacists");
      if (response.status === 200) {
        setResponseData(response.data);
      } else {
        console.log("Server error");
      }
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("No potential doctors found.");
      } else if (error.response && error.response.status === 500) {
        setError("Server Error");
      }
      setLoading(false);
    }
  };

  const users = responseData;

  const test = [ // Declare and initialize an array
  { quantity: 2, price: 10.99, name: "Item 1" },
  { quantity: 3, price: 15.99, name: "Item 2" },
  { quantity: 1, price: 5.99, name: "Item 3" },
];

  return (
    <Container
      className="bg-white px-5 py-4 d-flex align-items-center justify-content-center"
      style={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        marginLeft: "100px",
      }}
    >
    

      {users.map((user, index) => (
        <PatientMyOrdersCard
          key={index}
          orderNumber={user.name}
          orderStatus={user.name}
          orderCost={user.email}
          orderDate ={user.name}    
          test = {test}

        />
      ))}
    </Container>
  );
}
