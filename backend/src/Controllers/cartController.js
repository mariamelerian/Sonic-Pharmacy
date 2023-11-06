// cartController.js

const Medicine = require("../Models/Medicine");

// Add a medicine to the cart
const addToCart = async (req, res) => {
  const medicineId = req.params.medicineId;

  // Initialize the cart in the session if it doesn't exist
  if (!req.session.cart) {
    req.session.cart = [];
  }

  try {
    // Find the selected medicine by its ID
    const selectedMedicine = await Medicine.findById(medicineId);

    if (selectedMedicine) {
      // Add the medicine to the cart in the session
      const medicine = {
        _id: selectedMedicine._id,
        name: selectedMedicine.name,
        price: selectedMedicine.price,
        quantity: 1,
      };
      req.session.cart.push(medicine);
      res.status(200).json({ message: "Medicine added to the cart" });
    } else {
      res.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding medicine to the cart" });
  }
};

// View the cart contents
const viewCart = (req, res) => {
  const cartContents = req.session.cart || [];
  res.status(200).json(cartContents);
};

// Clear the cart
const clearCart = (req, res) => {
  req.session.cart = [];
  res.status(200).json({ message: "Cart cleared" });
};

// Change the quantity of a medicine in the cart
const changeQuantity = (req, res) => {
  const medicineId = req.params.medicineId;
  const quantity = parseInt(req.body.quantity);

  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  if (!req.session.cart) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const medicineInCart = req.session.cart.find(
    (item) => item._id == medicineId
  );
  if (medicineInCart) {
    medicineInCart.quantity = quantity;
    return res.status(200).json({ message: "Quantity updated" });
  }

  return res.status(404).json({ message: "Medicine not found in the cart" });
};

// Remove a medicine from the cart
const removeFromCart = (req, res) => {
  const medicineId = req.params.medicineId;

  if (!req.session.cart) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const index = req.session.cart.findIndex((item) => item._id == medicineId);
  if (index !== -1) {
    req.session.cart.splice(index, 1);
    return res.status(200).json({ message: "Medicine removed from the cart" });
  }

  return res.status(404).json({ message: "Medicine not found in the cart" });
};

module.exports = {
  addToCart,
  viewCart,
  clearCart,
  changeQuantity,
  removeFromCart,
};
