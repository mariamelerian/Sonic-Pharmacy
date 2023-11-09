import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function PatientMyordersDetails({
    orderNumber,
    orderStatus,   //if status is en route then we can cancel the order
    orderCost,
    orderDate,
    items
}) {
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

  return (
    <Card style={{ width: "100%", border: "transparent" }}>
      <Card.Body>
        <div className="d-flex justify-content-end">
         { orderStatus==='Pending' && <Button
          variant = "secondary"
            style={{
              backgroundColor: "#f0f0f0",
              marginLeft: "20px",
              borderColor: "#f0f0f0",
              width: "100px",
              height: "40px",
            }}
          >
    
             Cancel
          </Button>}
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

              <div style={{color:"#05afb9", fontSize:"1.3rem", fontWeight:"bold", marginBottom:"0.5rem"}}>
              {orderStatus}
               </div>
            <div style={rowStyle}>
              <span style={titleStyle}>Order Number:</span>
              {orderNumber}
            </div>
            <div style={rowStyle}>
              <span style={titleStyle}>Date:</span>
              {orderDate}
            </div>
            {items.map((items, index) => (
                <>

                      <div style={rowStyle}>
                        <span style={titleStyle}>*Name:</span>
                       {items.name}
                       </div>

                       <div style={rowStyle}>
                        <span style={titleStyle}>Price:</span>
                       {items.price}
                       </div>
                    <div style={rowStyle}>
                     <span style={titleStyle}>Quantity:</span>
                      {items.quantity}
                    </div>
                       </>
                  ))}

                  <div style={rowStyle}>
                   <span style={titleStyle}> Total Cost:</span>
                   {orderCost} LE
                   </div>
     </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
