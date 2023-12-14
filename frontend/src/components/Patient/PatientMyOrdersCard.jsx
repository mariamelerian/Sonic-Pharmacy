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
                  display: "inline-block",
                }}
              >
                Order {orderNumber}
              </div>
              <div
                style={{
                  display: "inline-block",
                }}
              >
                {orderDate.split("T")[0].split("-").reverse().join("/")}
              </div>
              <div
                style={{
                  color:
                    orderStatus == "Pending" || orderStatus == "Cancelled"
                      ? "#FF0000"
                      : "#05afb9",
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  display: "inline-block",
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
