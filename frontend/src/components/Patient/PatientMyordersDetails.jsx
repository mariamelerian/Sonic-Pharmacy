import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
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
  // console.log('Address:', address);
  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    marginBottom: "5px",
  };

  const titleStyle = {
    color: "#212529",
    marginRight: "5px",
    fontWeight: "bold",
    fontSize: "15px",
  };

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
    <Card style={{ width: "100%", border: "transparent" }}>
      <Card.Body>
        <div className="d-flex justify-content-end">
          {orderStatus === "Pending" && (
            <Button
              onClick={() => handleCancel()}
              variant="secondary"
              style={{
                backgroundColor: "#f0f0f0",
                marginLeft: "20px",
                borderColor: "#f0f0f0",
                width: "100px",
                height: "40px",
              }}
            >
              Cancel
            </Button>
          )}
        </div>

        <Card.Text>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              fontSize: "15px",
            }}
          >
            {/* <div
              style={{
                color: "#05afb9",
                fontSize: "1.3rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              {orderStatus}
            </div> */}

            {/* <div style={rowStyle}>
              <span style={titleStyle}>Date:</span>
              {orderDate}
            </div> */}
            <ul>
              {items.map((items, index) => (
                <li
                  style={{
                    display: "flex",
                    marginBottom: "5px",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "block",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      ...rowStyle,
                      display: "inline-block",
                      width: "30%",
                    }}
                  >
                    <span style={titleStyle}>Name:</span>
                    {items.name}
                  </div>

                  <div
                    style={{
                      ...rowStyle,
                      display: "inline-block",
                      width: "30%",
                    }}
                  >
                    <span style={titleStyle}>Price:</span>
                    {items.price}
                  </div>
                  <div
                    style={{
                      ...rowStyle,
                      display: "inline-block",
                      width: "30%",
                    }}
                  >
                    <span style={titleStyle}>Quantity:</span>
                    {items.quantity}
                  </div>
                </li>
              ))}
            </ul>
            <div style={rowStyle}>
              <span style={titleStyle}> Delivery Address:</span>
              {address}
            </div>

            <div style={rowStyle}>
              <span style={titleStyle}> Total Cost:</span>
              {orderCost.toFixed(2)} LE
                          </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
