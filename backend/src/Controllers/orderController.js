const Order = require("../Models/Order");

const createOrder = async () => {
  try {
    const orderData = req.body; // Assuming the request body contains the order data
    const order = new Order(orderData);
    await order.save();
  } catch (error) {}
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
  const patientId = req.params.patientId; // Assuming the patient identifier is in the request parameters

  try {
    const orders = await Order.find({
      patient: patientId,
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

  try {
    const order = await Order.findById(orderId);
    if (order) {
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
  try {
    const order = await Order.findById(orderId);
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
      await order.remove();
      res.status(200).json({ message: "Order deleted" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the order" });
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
};
