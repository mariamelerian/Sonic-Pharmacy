import React, { useState } from "react";
import { faArrowDown, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import PatientMyordersDetails from "./PatientMyordersDetails";

export default function PatientMyOrdersCard({
  orderId,
  orderNumber,
  orderStatus, //if status is en route then we can cancel the order
  orderCost,
  orderDate,
  items,
  handleChangeState,
  address,
}) {
  let orderColor = "#05afb9";
  if (orderStatus == "Cancelled") {
    orderColor = "#FF0000";
  } else if (orderStatus == "Delivered") {
    orderColor = "00FF00";
  } else if (orderStatus == "Pending") {
    //lighter red
    orderColor = "#FF8080";
  }

  return (
    <Container style={{ width: "1000px", padding: "0px" }}>
      <Accordion defaultactiveKey={1} className="acc mt-4">
        <Accordion.Item eventKey={0}>
          <Accordion.Header>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                display: "block",
                width: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "17px",
                  marginRight: "30%",
                  fontWeight: "bold",
                  color: "#212529",
                  width: "30%",
                  display: "inline-block",
                }}
              >
                Order {orderNumber}
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "30%",
                }}
              >
                {orderDate.split("T")[0].split("-").reverse().join("/")}
              </div>

              <div
                style={{
                  color: orderColor,
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  display: "inline-block",
                  width: "30%",
                  marginRight: "10px",
                  textAlign: "center",
                }}
              >
                {orderStatus}
              </div>
            </div>
          </Accordion.Header>

          <AccordionBody>
            <PatientMyordersDetails
              orderId={orderId}
              orderNumber={orderNumber}
              orderStatus={orderStatus}
              orderCost={orderCost}
              orderDate={orderDate}
              address={address}
              items={items}
              handleChangeState={handleChangeState}
            />
          </AccordionBody>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
