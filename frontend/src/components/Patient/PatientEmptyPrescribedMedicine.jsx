import React from 'react';
import { Button, Card } from 'react-bootstrap';

function PatientEmptyPrescribedMedicine() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    position: 'relative',
    top: '-100px', // Adjusted top to raise it further up
  };

  const contentStyle = {
    background: '#f8f9fa', // Light grey background color
    padding: '30px', // Adjusted padding
    borderRadius: '10px',
    textAlign: 'center',
    color: '#343a40', // Text color
  };

  const buttonStyle = {
    backgroundColor: 'blue', // Use the Bootstrap primary color here
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px', // Adjusted margin-top
  };

  const messageStyle = {
    fontSize: '24px', // You can adjust the font size here
    marginBottom: '20px', // Adjusted margin-bottom
  };

  return (
    <div style={containerStyle} className="empty-cart">
      <Card style={contentStyle}>
        <Card.Body>
          <p style={messageStyle}>You Don't Have Any Prescribed Medicines.</p>
          {/* <a href="/patient/patient-medicine">
            <Button variant="primary" style={buttonStyle} className="buy-button">
              Buy Medicine
            </Button>
          </a> */}
        </Card.Body>
      </Card>
    </div>
  );
}

export default PatientEmptyPrescribedMedicine;