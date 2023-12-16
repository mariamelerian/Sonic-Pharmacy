import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import PhShowActiveMedicine from "./PhShowActiveMedicine";
import PhShowArchivedMedicine from "./PhShowArchivedMedicine";

function PhShowMedicine() {
  const [key, setKey] = useState("activeMedicine"); // Set the initial state to "activeMedicine"

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 justify-content-center"
    >
      <Tab eventKey="activeMedicine" title="Active Medicine">
        <PhShowActiveMedicine />
      </Tab>
      <Tab eventKey="Archived" title="Archived Medicine">
        <PhShowArchivedMedicine />
      </Tab>
    </Tabs>
  );
}

export default PhShowMedicine;
