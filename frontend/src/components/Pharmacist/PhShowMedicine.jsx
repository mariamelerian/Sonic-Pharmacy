import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import PhShowActiveMedicine from "./PhShowActiveMedicine";
//import PhShowActiveMedicine from "./PhShowActiveMedicine";
//archived medicine

function PhShowMedicine() {
  const [key, setKey] = useState("prescribed");

  return (
    
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 justify-content-center"
      
    >
      
      <Tab eventKey="activeMedicine" title="Active Medicine">
      <PhShowActiveMedicine/>
        {/* <PatientShowMedicine prescribed={false} /> */}
      </Tab>
      <Tab eventKey="Archived" title="Archived Medicine">
        {/* <PatientPrescribedMedicine prescribed={true} /> */}
        {/* <PatientPrescribedMedicine/> */}
      </Tab>
    </Tabs>
  );
}

export default PhShowMedicine;