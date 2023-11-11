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

      const response = await axios.get("/allOrders");

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


  const orders = responseData;

  return (
    //loadingggggggggggggg
    <>
    {orders.length==0? <div style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#212529",
          }}>No Orders Found</div>: ( <Container

      className="bg-white px-5 py-4 d-flex align-items-center justify-content-center"
      style={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        marginLeft: "100px",
      }}
    >
    

       
       {orders.map((order, index) => (
        <PatientMyOrdersCard
          key={index}
          orderNumber={order._id}
          orderStatus={order.status}
          orderCost={order.totalPrice}
          orderDate ={order.date}    
          items = {order.items}

        />
      ))} 
    </Container>) }
    </>
    
   

  );
}
