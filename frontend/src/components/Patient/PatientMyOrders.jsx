import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
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
      const response = await axios.get("/patientorders");

      if (response.status === 200) {
        await setResponseData(response.data);
      } else {
        console.log("Server error");
      }
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("No orders found.");
      } else if (error.response && error.response.status === 500) {
        setError("Server Error");
      }
      setLoading(false);
    }
  };

  const orders = responseData;

  const handleChangeState = async (orderId, orderStatus) => {
    await setResponseData((prev) => {
      return prev.map((order) => {
        if (order._id === orderId) {
          order.status = orderStatus;
        }
        return order;
      });
    });
  };

  return (
    <>
      {" "}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {!loading && (
        <div>
          {orders.length == 0 ? (
            <div className="msg" style={{ marginTop: "5rem" }}>
              No Orders Found
            </div>
          ) : (
            <Container
              className="bg-white px-5 py-4 d-flex align-items-center justify-content-center"
              style={{
                // margin: "20px",
                display: "flex",
                flexDirection: "column",
                // marginLeft: "100px",
              }}
            >
              {orders.map((order, index) => (
                <PatientMyOrdersCard
                  key={index}
                  orderId={order._id}
                  orderNumber={order.number}
                  orderStatus={order.status}
                  orderCost={order.totalPrice}
                  orderDate={order.date}
                  address={order.address}
                  items={order.items}
                  handleChangeState={handleChangeState}
                />
              ))}
            </Container>
          )}
          {error1 && <div className="error">{error1}</div>}
        </div>
      )}
    </>
  );
}
