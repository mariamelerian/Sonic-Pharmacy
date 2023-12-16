import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrescriptionBottle } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

export default function PatientMyordersDetails({
  orderId,
  orderNumber,
  orderStatus, //if status is en route then we can cancel the order
  orderCost,
  orderDate,
  address,
  items,
  handleChangeState,
}) {
  const handleCancel = async () => {
    try {
      const response = await axios.put(`/cancelOrder/${orderId}`);
      if (response.status === 200) {
        handleChangeState(orderId, "Cancelled");
        orderStatus = "Cancelled";
      } else {
        console.log("error cancelling order");
      }
    } catch (error) {
      console.log("error cancelling " + error.message);
    }
  };

  return (
    <Card style={{ border: "transparent" }}>
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <ListGroup style={{ width: "100%" }}>
          {items.map((item, index) => (
            <ListGroup.Item
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                padding: "0.75rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "50rem",
                marginLeft: "3.5rem",
                backgroundColor: "#f0f0f0 ",
              }}
            >
              <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                <FontAwesomeIcon
                  icon={faPrescriptionBottle}
                  style={{ marginRight: "0.7rem" }}
                />
                {item.name}
              </div>
              <div style={{ fontSize: "1.1rem" }}>${item.price}</div>
              <div style={{ fontSize: "1.1rem" }}>
                Quantity: {item.quantity}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div
          className="d-flex justify-content-between"
          style={{ width: "50rem", marginLeft: "-1rem" }}
        >
          <div style={{ fontSize: "1.1rem" }}>Delivering to {address}</div>
          <div
            style={{
              // fontWeight: "bold",
              fontSize: "1.1rem",
              justifyContent: "flex-end",
            }}
          >
            Delivery Fees: $ 10.00
          </div>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ width: "50rem", marginLeft: "-1rem" }}
        >
          <div style={{ fontSize: "1.1rem" }}> </div>

          {/* <div style={{ fontSize: "1.1rem" }}>Delivering to {address}</div> */}
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem",
              justifyContent: "flex-end",
            }}
          >
            Total: ${orderCost.toFixed(2)}
          </div>
        </div>

        {orderStatus === "Pending" && (
          <Button
            onClick={() => handleCancel()}
            variant="secondary"
            style={{
              marginLeft: "55rem",
              marginTop: "1rem",
              marginBottom: "-1rem",
            }}
          >
            Cancel
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
