import React, { useState } from "react";
import { Accordion, Container } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AdminDocReqDetails from "./AdminDocReqDetails";
import axios from "axios";
import { json } from "react-router";

export default function AdminDocReqCard({
  docName,
  docEmail,
  docRate,
  docEducation,
  docAffiliation,
  docBirthDate,
  id,
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleApprove = async () => {
    // Handle the logic for approving the document request
    // For now, let's just make the card disappear
    const response = await axios.put("/updatePharmacist", {
      id: id,
      state: "Active",
    });
    if (response.status === 200) {
      setIsVisible(false);
      console.log("Pharmacist Approved " + JSON.stringify(response.data));
    } else {
      console.log("error approving pharmacist");
    }
  };

  const handleReject = async () => {
    // Handle the logic for rejecting the document request
    // For now, let's just make the card disappear
    const response = await axios.put("/updatePharmacist", {
      id: id,
      state: "Rejected",
    });
    if (response.status === 200) {
      setIsVisible(false);
      console.log("Pharmacist Approved " + JSON.stringify(response.data));
    } else {
      console.log("error approving pharmacist");
    }
  };

  return (
    <>
      {isVisible && (
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
                    {docName}
                  </div>
                </div>
              </Accordion.Header>
              <AccordionBody>
                <AdminDocReqDetails
                  docEmail={docEmail}
                  docBirthDate={docBirthDate}
                  docRate={docRate}
                  docAffiliation={docAffiliation}
                  docEducation={docEducation}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              </AccordionBody>
            </Accordion.Item>
          </Accordion>
        </Container>
      )}
    </>
  );
}
