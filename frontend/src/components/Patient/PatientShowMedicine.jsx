import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import PatientPrescribedMedicine from "./PatientShowPrescribedMedicine";
import PatientNonPrescribedMedicine from "./PatientShowNonPrescribedMedcine";

function MedicineTabs() {
  const [key, setKey] = useState("nonPrescribed");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 justify-content-center"
    >
      <Tab eventKey="nonPrescribed" title="OTC Medicines">
        <PatientNonPrescribedMedicine />
        {/* <PatientShowMedicine prescribed={false} /> */}
      </Tab>
      <Tab eventKey="prescribed" title="Prescription Medicines">
        {/* <PatientPrescribedMedicine prescribed={true} /> */}
        <PatientPrescribedMedicine />
      </Tab>
    </Tabs>
  );
}

export default MedicineTabs;
