const Order = require("../Models/Order");
const Cart = require("../Models/Cart");
const Medicine = require("../Models/Medicine");

const createOrder = async () => {
  try {
    const userId = req.session.userId; // Assuming the user ID is in the session

    const cart = await Cart.findOne({ user: userId });
    const items = cart.items;

    const count = await Order.countDocuments({ patient: userId });
    const orderNumber = count + 1;

    const orderData = {
      number: orderNumber,
      date: new Date(),
      items: items,
      totalPrice: cart.total + 50,
      status: "Pending",
      patient: userId,
    };
    const order = new Order(orderData);
    await order.save();

    cart.items.map(async (item) => {
      const medicine = await Medicine.findById(item.medicine);
      medicine.sales += item.quantity;
      await medicine.save();
    });

    // Clear the cart
    cart.items = [];
    cart.total = 0;
    await cart.save();
  } catch (error) {
    throw new Error("Failed to create the order : " + error.message);
  }
};

const checkout = async (req, res) => {
  //redirect to payment gateway
  //clear cart
  //create order
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
};

const getOrderById = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the order" });
  }
};

const getPatientOrders = async (req, res) => {
  let userId = req.session.userId;
  if (!userId) userId = req.params.userId;

  try {
    const orders = await Order.find({
      patient: userId,
      state: { $ne: "Cancelled" },
    });
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve orders for the patient" });
  }
};

const updateOrderByID = async (req, res) => {
  const orderId = req.params.orderId;
  const newStatus = req.body.status; // Assuming the request body contains the new status
  console.log(orderId, newStatus);
  try {
    const order = await Order.findById(orderId);
    console.log(order);
    if (order) {
      order.status = newStatus;
      await order.save();
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update the order" + error.message });
  }
};

const updateOrderByNumber = async (req, res) => {
  const orderNumber = req.params.orderNumber;
  let userId = req.session.userId;
  if (!userId) userId = req.params.userId;
  const newStatus = req.body.status; // Assuming the request body contains the new status

  try {
    const order = await Order.findOne({ number: orderNumber, patient: userId });
    if (order) {
      5;
      order.status = newStatus;
      await order.save();
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update the order" });
  }
};

const cancelOrderByID = async (req, res) => {
  const orderId = req.params.orderId;
  console.log(orderId);
  try {
    const order = await Order.findById(orderId);
    console.log(order);
    if (order) {
      order.status = "Cancelled";
      await order.save();
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update the order " + error.message });
  }
};

const cancelOrderByNumber = async (req, res) => {
  const orderNumber = req.params.orderNumber;
  let userId = req.session.userId;
  if (!userId) userId = req.params.userId;
  try {
    const order = await Order.findOne({ number: orderNumber, patient: userId });
    if (order) {
      order.status = "Cancelled";
      await order.save();
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update the order" });
  }
};

const deleteOrderByID = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (order) {
      await Order.findByIdAndRemove(order._id);
      res.status(200).json({ message: "Order deleted" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the order" });
  }
};

const deleteOrderByNumber = async (req, res) => {
  const orderNumber = req.params.orderNumber;
  let userId = req.session.userId;
  if (!userId) userId = req.params.userId;

  try {
    const order = await Order.findOne({ number: orderNumber, patient: userId });
    if (order) {
      await Order.findByIdAndRemove(order._id);
      res.status(200).json({ message: "Order deleted" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete the order : " + error.message });
  }
};

module.exports = {
  checkout,
  getOrderById,
  getAllOrders,
  getPatientOrders,
  updateOrderByID,
  cancelOrderByID,
  deleteOrderByID,
  updateOrderByNumber,
  cancelOrderByNumber,
  deleteOrderByNumber,
};
