import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Container, Button,Spinner } from "react-bootstrap";
import medicineBlueImg from "../../Assets/Patient/medicineBlueImg.jpg";
import PatientCheckOutModal from "./PatientCheckOutModal";
import axios from "axios";
import EmptyCart from "./PatientEmptyCart";
function CartItems() {
  const [loading, setLoading] = useState(true);
  const [checkout, setCheckout] = useState(false);
  const [medicine, setMedicine] = useState({ items: [] });
  const [error1, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/cart");

      if (response.status === 200) {
        await setMedicine(response.data);

        // Use Promise.all to wait for all image fetch requests to complete
        await Promise.all(
          response.data.items.map(async (item) => {
            try {
              // Fetch request to get medicine images
              const imageResponse = await axios.get("/medicine", {
                params: { _id: item.medicine },
              });

              // Update the image property using the updated response.data.picture
              setMedicine((prevMedicine) => ({
                ...prevMedicine,
                items: prevMedicine.items.map((item2) =>
                  item2.medicine === item.medicine
                    ? { ...item2, image: imageResponse.data.picture }
                    : item2
                ),
              }));
            } catch (error) {
              console.log("error fetching image:", error.message);
            }
          })
        );

        setLoading(false);
      } else {
        console.log("Server error");
      }
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
    try {
      const response = await axios.post(`/changequantity/${itemId}`, {
        quantity: newQuantity,
      });

      const price = response.data.items.filter(
        (item) => item.medicine === itemId
      )[0].price;

      setMedicine((prevMedicine) => {
        if (prevMedicine && prevMedicine.items) {
          const updatedItems = prevMedicine.items.map((item) =>
            item.medicine === itemId
              ? { ...item, quantity: newQuantity, price: price }
              : item
          );

          return {
            ...prevMedicine,
            items: updatedItems,
            total: response.data.total,
          };
        }

        // Return the unchanged state if items or prevMedicine is not defined
        return prevMedicine;
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    const response = await axios.post(`/removefromcart/${itemId}`);
    console.log(response.data);
  
    setMedicine((prevMedicine) => {
      const newItems = prevMedicine.items.filter((item) => item.medicine !== itemId);
  
      return {
        ...prevMedicine,
        items: newItems,
      };
    });
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
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  
  else if(medicine.items.length === 0) {
    //show the cart page without loading
    return (

      <div className="cart">
        <h2 style={{ fontSize: "48px" }}>My Cart</h2>
        <EmptyCart />
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
            <Button
              variant="primary"
              style={checkoutButtonStyle}
              onClick={() => setCheckout(true)}
            >
              Proceed to Checkout
            </Button>
            {
            checkout && 
            (
              <PatientCheckOutModal
                subtotal={subtotal?.toFixed(2)}
                total={total?.toFixed(2)}
                delivery={delivery}
              />
            )}
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
