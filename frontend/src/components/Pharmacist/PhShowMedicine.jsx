import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import PhShowActiveMedicine from "./PhShowActiveMedicine";
import PhShowArchivedMedicine from "./PhShowArchivedMedicine";
import axios from "axios";

function PhShowMedicine() {
  const [key, setKey] = useState("activeMedicine"); // Set the initial state to "activeMedicine"

  const [loadingActive, setLoadingActive] = useState(true);
  const [responseDataActive, setResponseDataActive] = useState([]);
  const [errorActive, setErrorActive] = useState(null);

  const [loadingArchive, setLoadingArchive] = useState(true);
  const [responseDataArchive, setResponseDataArchive] = useState([]);
  const [errorArchive, setErrorArchive] = useState(null);

  const [flag, setFlag] = useState(false);

  const handleBroadcast = () => {
    setFlag(!flag);
  };

  useEffect(() => {
    fetchDataActive();
    fetchDataArchive();
  }, []);

  const fetchDataActive = async () => {
    try {
      const response = await axios.get("/medicines");
      if (response.status === 200) {
        setResponseDataActive(response.data);
        setLoadingActive(false);
      } else {
        setErrorActive("Server error");
        setLoadingActive(false);
      }
    } catch (error) {
      setErrorActive("An error occurred while fetching data.");
      setLoadingActive(false);
    }
  };

  const fetchDataArchive = async () => {
    try {
      const response = await axios.get("/archivedMedicines");
      if (response.status === 200) {
        setResponseDataArchive(response.data);
        setLoadingArchive(false);
      } else {
        setErrorArchive("Server error");
        setLoadingArchive(false);
      }
    } catch (error) {
      setErrorArchive("An error occurred while fetching data.");
      setLoadingArchive(false);
    }
  };

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 justify-content-center"
    >
      <Tab eventKey="activeMedicine" title="Active Medicine">
        <PhShowActiveMedicine
          responseData={responseDataActive}
          setResponseData={setResponseDataActive}
          error={errorActive}
          setError={setErrorActive}
          loading={loadingActive}
          setLoading={setLoadingActive}
          fetchData={fetchDataActive}
          flag={flag}
          onBroadcast={handleBroadcast}
        />
      </Tab>
      <Tab eventKey="Archived" title="Archived Medicine">
        <PhShowArchivedMedicine
          responseData={responseDataArchive}
          setResponseData={setResponseDataArchive}
          error={errorArchive}
          setError={setErrorArchive}
          loading={loadingArchive}
          setLoading={setLoadingArchive}
          fetchData={fetchDataArchive}
          flag={flag}
          onBroadcast={handleBroadcast}
        />
      </Tab>
    </Tabs>
  );
}

export default PhShowMedicine;
