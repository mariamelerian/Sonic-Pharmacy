import React, { useState } from "react";
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
  let statusColor = "#05afb9 ";

  if (orderStatus === "Cancelled") {
    statusColor = "#ff6b35 ";
  } else if (orderStatus === "Completed") {
    statusColor = "black";
  }

  return (
    <Container style={{ width: "64rem" }}>
      <Accordion defaultactiveKey={1} className="acc mt-4">
        <Accordion.Item eventKey={0}>
          <Accordion.Header className="d-flex flex-row align-items-center justify-content-between">
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginRight: "21rem",
              }}
            >{`Order ${orderNumber}`}</div>
            <div
              style={{
                fontSize: "1.1rem",
                marginRight: "21rem",
              }}
            >
              {orderDate.split("T")[0].split("-").reverse().join("/")}
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem",
                color: statusColor,
              }}
            >
              {orderStatus}

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
