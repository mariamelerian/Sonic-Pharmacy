// cartController.js

const Cart = require("../Models/Cart");
const Medicine = require("../Models/Medicine");

// Add a medicine to the cart
const addToCart = async (req, res) => {
  const medicineId = req.params.medicineId;
  let userId = req.session.userId;
  if (!userId) userId = req.params.userId;

  // Initialize the cart if it doesn't exist
  let cart = await Cart.findOne({ user: userId }).exec();

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [],
      total: 0,
    });
  }

  try {
    // Find the selected medicine by its ID
    const selectedMedicine = await Medicine.findById(medicineId);

    if (selectedMedicine) {
      // Add the medicine to the cart in the session
      const medicine = {
        medicine: selectedMedicine._id,
        name: selectedMedicine.name,
        price: selectedMedicine.price,
        quantity: 1,
      };
      cart.items.push(medicine);
      cart.total += medicine.price;
      await cart.save();
      res.status(200).json({ message: "Medicine added to the cart" });
    } else {
      res.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error adding medicine to the cart, error " + error.message,
    });
  }
};

// View the cart contents
const viewCart = async (req, res) => {
  let userId = req.session.userId;
  console.log(userId);
  if (!userId) userId = req.params.userId;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the cart" });
  }
};

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve carts" });
  }
};

// Clear the cart
const clearCart = async (req, res) => {
  let userId = req.session.userId;
  if (!userId) userId = req.params.userId;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      cart.items = [];
      cart.total = 0;
      await cart.save();
    }

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear the cart" });
  }
};

// Change the quantity of a medicine in the cart
const changeQuantity = async (req, res) => {
  const medicineId = req.params.medicineId;
  const quantity = parseInt(req.body.quantity);
  let userId = req.session.userId;
  if (!userId) userId = req.params.userId;

  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  const cart = await Cart.findOne({ user: userId }).exec();
  if (!cart) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const medicineInCart = cart.items.find((item) => item.medicine == medicineId);
  const medicine = await Medicine.findById(medicineId);

  if (medicineInCart) {
    medicineInCart.quantity = quantity;
    oldPrice = medicineInCart.price;
    medicineInCart.price = medicine.price * quantity;
    newPrice = medicineInCart.price;
    if (oldPrice < newPrice) {
      cart.total += newPrice - oldPrice;
    } else {
      cart.total -= oldPrice - newPrice;
    }
    await cart.save();
    return res.status(200).json(cart);
  }

  return res.status(404).json({ message: "Medicine not found in the cart" });
};

// Remove a medicine from the cart
const removeFromCart = async (req, res) => {
  const medicineId = req.params.medicineId;
  let userId = req.session.userId;
  if (!userId) userId = req.params.userId;

  const cart = await Cart.findOne({ user: userId }).exec();

  if (!cart) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const index = cart.items.findIndex((item) => item.medicine == medicineId);

  if (index !== -1) {
    cart.total -= cart.items[index].price;
    cart.items.splice(index, 1);
    await cart.save();
    return res.status(200).json(cart);
  }

  return res.status(404).json({ message: "Medicine not found in the cart" });
};

module.exports = {
  addToCart,
  viewCart,
  clearCart,
  changeQuantity,
  removeFromCart,
  getAllCarts,
};
