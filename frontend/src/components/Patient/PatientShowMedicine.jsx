import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import PatientPrescribedMedicine from "./PatientShowPrescribedMedicine";
import PatientNonPrescribedMedicine from "./PatientShowNonPrescribedMedcine";

function MedicineTabs() {
  const [key, setKey] = useState("prescribed");

  return (
    
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 justify-content-center"
      
    >
      
      <Tab eventKey="nonPrescribed" title="Non-Prescribed Medicine">
      <PatientNonPrescribedMedicine/>
        {/* <PatientShowMedicine prescribed={false} /> */}
      </Tab>
      <Tab eventKey="prescribed" title="Prescribed Medicine">
        {/* <PatientPrescribedMedicine prescribed={true} /> */}
        <PatientPrescribedMedicine/>
      </Tab>
    </Tabs>
  );
}

export default MedicineTabs;