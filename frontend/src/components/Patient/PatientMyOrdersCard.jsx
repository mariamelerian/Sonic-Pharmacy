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
           <div className="d-flex" style={{ flexDirection: "row", alignItems: "center" }}>
              <div
                style={{
                fontSize: "17px",
                marginRight: "10px",
                fontWeight: "bold",
                color: "#212529",
                }}
                 >
               Order {orderNumber}
             </div>
           <div
               style={{
               color: "#05afb9",
               fontSize: "1.3rem",
               fontWeight: "bold",
               alignItems: "right" 
                }}
               >
               {orderStatus}
             </div>
             <div >
              {orderDate}
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
