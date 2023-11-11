import React, { useState } from "react";
import { faArrowDown, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import PatientMyordersDetails from "./PatientMyordersDetails";

export default function PatientMyOrdersCard({
    orderNumber,
    orderStatus,   //if status is en route then we can cancel the order
    orderCost,
    orderDate,
    items

}) {
  return (
    <Container style={{ width: "1000px", padding: "0px" }}>
      <Accordion defaultactiveKey={1} className="acc mt-4">
        <Accordion.Item eventKey={0}>
          <Accordion.Header>
            <div className="d-flex" style={{ flexDirection: "column" }}>
              <div
                style={{
                  fontSize: "17px",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#212529",
                }}
              >
                {orderNumber}
              </div>
          {/*     <div style={{ fontSize: "15px", color: "#05afb9" }}>
                {docSpecialty}
              </div> */}
            </div>
          </Accordion.Header>
          <AccordionBody>
              <PatientMyordersDetails
                orderNumber={orderNumber}
                orderStatus={orderStatus}
                orderCost={orderCost}
                orderDate={orderDate}
                items = {items}

                />
          </AccordionBody>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
