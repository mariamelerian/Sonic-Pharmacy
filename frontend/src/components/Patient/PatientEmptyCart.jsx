import React from 'react';
import { Button } from 'react-bootstrap';

function EmptyCart() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    position: 'relative',
    top: '-20px', // Raise it up a bit
  };

  const contentStyle = {
    background: 'white',
    padding: '90px', // Increase padding to make the white box three times its current size
    borderRadius: '10px',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundColor: 'blue', // Use the Bootstrap primary color here
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const messageStyle = {
    fontSize: '32px', // You can adjust the font size here
  };

  return (
    <div style={containerStyle} className="empty-cart">
      <div style={contentStyle}>
        <p style={messageStyle}>Your cart is empty.</p>
        <a href="/patient/patient-medicine">
          <Button variant="primary" style={buttonStyle} className="buy-button">Buy Medicine</Button>
        </a>
      </div>
    </div>
  );
}

export default EmptyCart;
