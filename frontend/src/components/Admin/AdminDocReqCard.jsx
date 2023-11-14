import React, { useState } from "react";
import { Accordion, Container, Modal, Button } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AdminDocReqDetails from "./AdminDocReqDetails";
import axios from "axios";

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
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const handleClose = () => {
    setShowRejectModal(false);
    setShowAcceptModal(false);
  };

  const handleApprove = async () => {
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
                <Modal show={showRejectModal} onHide={handleClose}>
                  <Modal.Body>
                    Are you sure you want to reject this pharmacist's
                    application?
                  </Modal.Body>
                  <Modal.Footer className="d-flex align-items-center justify-content-center">
                    <Button variant="secondary" onClick={handleReject}>
                      Yes
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      No
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal show={showAcceptModal} onHide={handleClose}>
                  <Modal.Body>
                    Are you sure you want to accept this pharmacist's
                    application?
                  </Modal.Body>
                  <Modal.Footer className="d-flex align-items-center justify-content-center">
                    <Button variant="primary" onClick={handleApprove}>
                      Yes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                      No
                    </Button>
                  </Modal.Footer>
                </Modal>
                <AdminDocReqDetails
                  docEmail={docEmail}
                  docBirthDate={docBirthDate}
                  docRate={docRate}
                  docAffiliation={docAffiliation}
                  docEducation={docEducation}
                  onApprove={() => setShowAcceptModal(true)}
                  onReject={() => setShowRejectModal(true)}
                />
              </AccordionBody>
            </Accordion.Item>
          </Accordion>
        </Container>
      )}
    </>
  );
}
