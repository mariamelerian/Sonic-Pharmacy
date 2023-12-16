import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Container, Button, Spinner } from "react-bootstrap";
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

      if (response.status === 200) {
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
      } else {
        console.log("Server error");
        if (response.status === 400)
          setError("Cannot change quantity to more than available quantity");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    const response = await axios.post(`/removefromcart/${itemId}`);
    console.log(response.data);

    setMedicine((prevMedicine) => {
      const newItems = prevMedicine.items.filter(
        (item) => item.medicine !== itemId
      );

      return {
        ...prevMedicine,
        items: newItems,
      };
    });
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

  // Style for labels (Subtotal, Total, Delivery Fees)
  // const labelStyle = {
  //   fontSize: "24px",
  //   fontWeight: "bold",
  //   textAlign: "right",
  // };

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
  } else if (medicine.items.length === 0) {
    //show the cart page without loading
    return (
      <div className="cart">
        <div style={{ fontSize: "2rem" }}>My Cart</div>
        <EmptyCart />
      </div>
    );
  } else {
    // Calculate the subtotal
    const subtotal = medicine.total;
    const delivery = 10;
    const total = subtotal + delivery;

    return (
      <div className="cart">
        <div style={{ fontSize: "2rem" }}>My Cart</div>
        {medicine.items.map((item, index) => (
          <div
            key={item.medicine}
            className="d-flex align-items-center justify-content-between bg-white mb-3"
          >
            <div
              style={{
                marginLeft: "2rem",
                marginTop: "0.2rem",
                marginBottom: "0.2rem",
              }}
            >
              {" "}
              <img
                src={item.image}
                alt={item.name}
                width="50"
                height="90"
                style={{ borderRadius: "5px", marginRight: "2rem" }}
              />
            </div>
            <div style={{ marginLeft: "-28rem" }}>
              {" "}
              <div style={{ fontSize: "1.2rem" }}>
                <strong>{item.name}</strong>
              </div>
              <div style={{ color: "#c9dfdf ", marginLeft: "1.5rem" }}>
                In Stock
              </div>
            </div>
            <div>
              <div
                className=" d-flex align-items-center justify-content-center bg-light"
                style={{
                  borderRadius: "5px",
                  height: "2rem",
                  // position: "relative",
                  // left: "50%", // Position the button horizontally centered
                  transform: "translateX(-285%)",
                  marginTop: "1rem  ",
                }}
              >
                <Button
                  style={{
                    height: "1.8rem",
                    marginRight: "1rem",
                    left: "50%", // Position the button horizontally centered
                    transform: "translateX(-50%)",
                    lineHeight: "0.8rem",
                  }}
                  onClick={() =>
                    handleQuantityChange(item.medicine, item.quantity + 1)
                  }
                >
                  <strong>+</strong>
                </Button>
                {item.quantity}
                <Button
                  variant="secondary"
                  style={{
                    height: "1.8rem",
                    marginLeft: "1rem",
                    tight: "50%", // Position the button horizontally centered
                    transform: "translateX(50%)",
                    lineHeight: "0.8rem",
                  }}
                  onClick={() =>
                    handleQuantityChange(item.medicine, item.quantity - 1)
                  }
                >
                  <strong>-</strong>
                </Button>
              </div>
            </div>
            <div style={{ width: "6rem" }}>
              <div style={{ fontSize: "1.2rem" }}>
                <strong>{`$${item.price}`}</strong>
              </div>
              <FontAwesomeIcon
                style={{
                  color: "#ff6b35",
                  marginLeft: "4.5rem",
                  marginTop: "1rem",
                  cursor: "pointer",
                }}
                icon={faTrash}
                onClick={() => handleDeleteItem(item.medicine)}
              />
            </div>
          </div>
        ))}
        <div style={lineStyle}></div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div style={{ marginLeft: "60rem", fontSize: "1.5rem" }}>
              <strong>Subtotal:</strong>
            </div>

            <div style={{ color: "#ea5b27", fontSize: "1.5rem" }}>
              ${subtotal?.toFixed(2)}{" "}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div style={{ marginLeft: "60rem", fontSize: "1.4rem" }}>
              <strong>Delivery Fees:</strong>
            </div>
            <div style={{ color: "#ea5b27", fontSize: "1.4rem" }}>
              ${delivery}
            </div>
          </div>
          <div style={lineStyle2}></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ fontSize: "1.7rem" }}>
              <strong>Total:</strong>
            </div>
            <div style={{ color: "#ea5b27", fontSize: "1.7rem" }}>
              <strong>${total?.toFixed(2)}</strong>
            </div>
          </div>
          <div style={lineStyle2}></div>

          <div style={{ display: "flex", justifyContent: "right" }}>
            {/* <Link to="/patient/patient-checkout">
    <Button variant="primary" style={checkoutButtonStyle}>
      Proceed to Checkout
    </Button>
  </Link> */}

            <Button
              variant="secondary"
              style={checkoutButtonStyle}
              onClick={() => setCheckout(true)}
            >
              Proceed to Checkout
            </Button>

            {checkout && (
              <PatientCheckOutModal
                subtotal={subtotal?.toFixed(2)}
                total={total?.toFixed(2)}
                delivery={delivery}
                visibility={checkout} // Pass the checkout state
                fetchCart={fetchData}
                onHide={() => {
                  fetchData();
                  setCheckout(false);
                }} // Function to hide the modal
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
