import React, { useState } from "react";
import { Card, Col, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faCheckCircle, faTimesCircle, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function AdminPharmDetails() {
  const Pharmacists = [
    {
      PharmacistName: 'Ahmed',
      email:'ahmed@hotmail.com',
      username:'ahmed123',
      date: "25-3-2003",
      HourlyRate: '100/hr',
      affliliation: 'St Jose',
      educationalBackground: 'GUC',
    /*   time: "10:00 AM",
      status: "Confirmed", */
   /*    upcomingAppointments: [
        {
          date: "2023-10-20",
          time: "9:30 AM",
          status: "Confirmed",
        },
        {
          date: "2023-10-25",
          time: "11:00 AM",
          status: "Confirmed",
        },
      ], */
      /* age: 20, */
      gender: "Male",
      /* medicalHistory: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor euismod lacus, non cursus nunc fringilla ut.", */
    },
    {
      PharmacistName: 'Lola',
      email:'lola@hotmail.com',
      username:'lola123',
      date: "7-10-2002",
      HourlyRate: '1/hr',
      affliliation: 'St Jose',
      educationalBackground: 'GUC',
      /* time: "2:30 PM",
      status: "Cancelled", */
      /* upcomingAppointments: [], */
      /* age: 28, */
      /* gender: "Female", */
      /* medicalHistory: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor euismod lacus, non cursus nunc fringilla ut.", */
    },
    {
        PharmacistName: 'Maddison',
        email:'JamesMadders@hotmail.com',
        username:'Madders',
        date: "1-6-1996",
        HourlyRate: '200/hr',
        affliliation: 'St Jose',
        educationalBackground: 'GUC',
        /* time: "2:30 PM",
        status: "Cancelled", */
        /* upcomingAppointments: [], */
        /* age: 26, */
        gender: "Male",
        /* medicalHistory: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor euismod lacus, non cursus nunc fringilla ut.", */
      },
    // Add more patient objects as needed
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPharmacists = Pharmacists.filter((pharmacist) =>
    pharmacist.PharmacistName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [expandedPharmacist, setExpandedPharmacist] = useState(null);

  const toggleExpand = (index) => {
    if (expandedPharmacist === index) {
      setExpandedPharmacist(null);
    } else {
      setExpandedPharmacist(index);
    }
  };

  return (
    <div>
      <Form className="my-4 mx-3">
        <Form.Control
          type="text"
          placeholder="Search Pharmacists"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form>
      {filteredPharmacists.map((pharmacist, index) => (
        <Card className="mb-4 mx-3 bg-light" key={pharmacist.PharmacistName}>
          <Card.Header
            className="d-flex align-items-center justify-content-between"
            onClick={() => toggleExpand(index)}
            style={{ cursor: "pointer" }}
          >
            <span>Pharmacist Name: {pharmacist.PharmacistName}</span>
            <FontAwesomeIcon
              icon={expandedPharmacist === index ? faChevronUp : faChevronDown}
            />
          </Card.Header>
          {expandedPharmacist === index && (
            <Card.Body>
              <Row>
                <Col lg={4}>
               {/*    <div
                    className={`appointment-icon-container ${
                      patient.status === "Confirmed" ? "confirmed" : "cancelled"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        patient.status === "Confirmed"
                          ? faCheckCircle
                          : faTimesCircle
                      }
                      className="appointment-icon"
                    />
                  </div> */}
                </Col>
                <Col lg={8}>
                  <Card.Text>
                    {/* <div className="show-more-date">
                      <FontAwesomeIcon
                        icon={faCalendar}
                        style={{ marginRight: "0.5rem" }}
                      />
                      {patient.date}
                    </div>
                    <div className="show-more-time">
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{ marginRight: "0.5rem" }}
                      />
                      {patient.time}
                    </div>
                    <div
                      className={`show-more-status ${
                        patient.status === "Confirmed" ? "confirmed" : "cancelled"
                      }`}
                    >
                      {patient.status}
                    </div> */}
                    <hr />
                 {/*    <div className="upcoming-appointments">
                      <h5>Upcoming Appointments</h5>
                      {patient.upcomingAppointments.length === 0 ? (
                        <p>No upcoming appointments</p>
                      ) : (
                        <ul>
                          {patient.upcomingAppointments.map((appointment) => (
                            <li key={appointment.date}>
                              <div>{appointment.date}</div>
                              <div>{appointment.time}</div>
                              <div>{appointment.status}</div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div> */}
                    <hr />
                    <div className="patient-info">
                      <h5>Pharmacists Information:</h5>
                      <p>Username: {pharmacist.username}</p>
                      <p>Email: {pharmacist.email}</p>
                      <p>Date of Birth: {pharmacist.date}</p>
                      {/* <p>Age: {pharmacist.age}</p> */}
                      {/* <p>Gender: {pharmacist.gender}</p> */}
                      <p>Hourly Rate: {pharmacist.HourlyRate}</p>
                      <p>Affiliation: {pharmacist.affliliation}</p>
                      <p>Educational Background: {pharmacist.educationalBackground}</p>
                      {/* <p>Medical History: {pharmacist.medicalHistory}</p> */}
                      <button >Delete Pharmacist</button>
                    </div>
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          )}
        </Card>
      ))}
    </div>
  );
}

export default AdminPharmDetails;