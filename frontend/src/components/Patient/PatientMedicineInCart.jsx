import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Container, Button } from "react-bootstrap";
import medicineBlueImg from "../../Assets/Patient/medicineBlueImg.jpg";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Set your base URL
  timeout: 5000, // Set a timeout for requests (optional)
  headers: {
    "Content-Type": "application/json",
    // Add any other common headers here
  },
});

function CartItems() {
  const [loading, setLoading] = useState(true);
  const [medicine, setMedicine] = useState({});
  const [error1, setError] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/cart");

      if (response.status === 200) {
        setMedicine(response.data);
        console.log("response data" + medicine.items);

        medicine.items.map((item) => {
          //fetch request to get medicine images
          axios
            .get("/medicine", { params: { _id: item.medicine } })
            .then((response) => {
              setMedicine((prevMedicine) =>
                prevMedicine.items.map((item2) =>
                  item2.medicine === item.medicine
                    ? { ...item, image: response.data.picture }
                    : item
                )
              );
            })
            .catch((error) => {
              console.log("error : " + error.message);
            });
        });

        setLoading(false);
      } else {
        console.log("Server error");
      }
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("No cart items found.");
      } else if (error.response && error.response.status === 500) {
        setError("Server Error");
      }
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    await axios
      .post(`/changequantity/${itemId}`, { quantity: newQuantity })
      .then((response) => {
        console.log(response.data);
        setMedicine((prevMedicine) => {
          if (prevMedicine && prevMedicine.items) {
            return {
              ...prevMedicine,
              items: prevMedicine.items.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
              ),
            };
          }
        });
      })
      .catch((error) => {
        console.log("error : " + error.message);
      });
  };

  const handleDeleteItem = (itemId) => {
    setMedicine((prevMedicine) =>
      prevMedicine.filter((item) => item.id !== itemId)
    );
  };

  const plusMinusButtonStyle = {
    width: "24px",
    height: "24px",
    borderRadius: "50%", // Makes the buttons circular
    backgroundColor: "#4fa4ff", // Blue color
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "10px",
  };

  const lineStyle = {
    borderBottom: "3px solid #ccc",
    width: "100%",
    margin: "50px 0 0 0",
  };

  const lineStyle2 = {
    borderBottom: "3px solid #ccc",
    width: "100%",
    margin: "5px 0 0 0",
  };
  const cartItemStyle = {
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px", // Add padding on the left
    borderRadius: "10px", // Apply rounded edges to each row
    overflow: "hidden", // Ensure content within the rounded edges is visible
    border: "20px solid white", // Add white borders
    margin: "10px 0", // Add margin to separate the rows
  };

  const buttonsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "10px", // Add margin to separate buttons
  };

  const quantityStyle = {
    fontSize: "20px", // Increase font size
    fontWeight: "bold", // Make it bold
  };

  const trashIconStyle = {
    color: "red",
    cursor: "pointer", // Add cursor style
    fontSize: "18px", // Make the icon 1.5 times bigger (adjust the size as needed)
    border: "none", // Remove the border
    marginLeft: "900px", // Move the icon to the right by 200px
    backgroundColor: "transparent",
  };

  const cartItemImageStyle = {
    borderRadius: "5px", // Apply rounded corners to the image
  };

  // Style for labels (Subtotal, Total, Delivery Fees)
  const labelStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "right",
  };

  // Style for values (subtotal and total)
  const valueStyle = {
    fontSize: "18px",
    textAlign: "left",
  };

  // Style for the "Proceed to Checkout" button
  const checkoutButtonStyle = {
    backgroundColor: "#007bff", // Blue color
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "50px", // Push the button more to the bottom
    marginBottom: "50px",
  };

  if (loading) {
    //show the cart page without loading
    return (
      <div className="cart">
        <h2 style={{ fontSize: "48px" }}>My Cart</h2>
      </div>
    );
  } else {
    // Calculate the subtotal
    const subtotal = medicine.total;
    const total = subtotal + 50;
    const delivery = 50;

    return (
      <div className="cart">
        <h2 style={{ fontSize: "48px" }}>My Cart</h2>
        {medicine.items.map((item, index) => (
          <div key={item.medicine}>
            {/* <div style={lineStyle}></div> */}
            <div style={cartItemStyle}>
              <div style={buttonsContainerStyle}>
                <button
                  style={plusMinusButtonStyle}
                  onClick={() =>
                    handleQuantityChange(item.medicine, item.quantity + 1)
                  }
                >
                  +
                </button>
                <div style={quantityStyle}>{item.quantity}</div>
                <button
                  style={plusMinusButtonStyle}
                  onClick={() =>
                    handleQuantityChange(item.medicine, item.quantity - 1)
                  }
                >
                  -
                </button>
              </div>
              <div className="cart-item-image">
                <img
                  src={item.image}
                  alt={item.name}
                  width="50"
                  height="90"
                  style={cartItemImageStyle}
                />
              </div>
              <div className="cart-item-details">
                <div
                  className="cart-item-name"
                  style={{
                    quantityStyle,
                    marginLeft: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </div>
                <div
                  className="cart-item-price"
                  style={{ marginLeft: "10px" }}
                >{`$${item.price}`}</div>
              </div>
              <button
                onClick={() => handleDeleteItem(item.medicine)}
                style={trashIconStyle}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
        <div style={lineStyle}></div>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={labelStyle}>Subtotal:</div>
            <div style={valueStyle}>{subtotal?.toFixed(2)} LE</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={labelStyle}>Delivery Fees:</div>
            <div style={valueStyle}>{delivery} LE</div>
          </div>
          <div style={lineStyle2}></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={labelStyle}>Total:</div>
            <div style={valueStyle}>{total?.toFixed(2)} LE</div>
          </div>
          <div style={lineStyle2}></div>

          <div style={{ display: "flex", justifyContent: "right" }}>
            <Link to="/patient/patient-checkout">
              <Button variant="primary" style={checkoutButtonStyle}>
                Proceed to Checkout
              </Button>
            </Link>

            <div style={{ width: "50px" }}></div>

            <Link to="/patient/patient-medicine">
              <Button variant="primary" style={checkoutButtonStyle}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItems;
