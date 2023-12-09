const Order = require("../Models/Order");
const Cart = require("../Models/Cart");
const Medicine = require("../Models/Medicine");
const Patient = require("../Models/Patient");

const stripe = require("stripe")(
  "sk_test_51O9lZ0IQTS4vUIMWJeAJ5Ds71jNbeQFj6v8mO7leS2cDIJuLy1fwNzoiXPKZV5KdoMpfzocfJ6hBusxPIjbGeveF00RTnmVYCX"
);

const notifyPharmacistsOutOfStock = async (medicine) => {
  try {
    const pharmacists = await Pharmacist.find();
    const mailOptions = {
      from: emailUser,
      to: pharmacists.map((pharmacist) => pharmacist.email).join(","),
      subject: "Medicine out of stock",
      text: `Please note that ${medicine.name} medicine is out of stock.`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Successful" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Failed to send the email" });
  }
};

const createOrder = async (userId, address, paymentMethod) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    const items = cart.items;

    const count = await Order.countDocuments({ patient: userId });
    const orderNumber = count + 1;

    const date = new Date();

    const orderData = {
      number: orderNumber,
      date: date,
      items: items,
      totalPrice: cart.total + 50,
      status: "Pending",
      patient: userId,
      address: address,
      paymentMethod: paymentMethod,
    };
    const order = new Order(orderData);
    await order.save();

    cart.items.map(async (item) => {
      const medicine = await Medicine.findById(item.medicine);
      medicine.sales += item.quantity;
      medicine.quantity -= item.quantity;
      medicine.salesData.push({
        quantity: item.quantity,
        date: date,
      });
      await medicine.save();

      if (medicine.quantity == 0) {
        //notify pharmacist that medicine is out of stock
        notifyPharmacistsOutOfStock(medicine);
      }
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
  //create order
  try {
    await createOrder(
      req.session.userId,
      req.body.address,
      req.body.paymentMethod
    );

    //clear cart
    const userId = req.session.userId;

    res.status(200).json({ message: "Order created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const checkoutWallet = async (req, res) => {
  //check wallet balance
  const userId = req.session.userId;
  const cart = await Cart.findOne({ user: userId });
  const user = await Patient.findById(userId);
  let wallet = user.wallet;
  if (wallet < cart.total + 50) {
    res.status(400).json({ message: "Insufficient funds" });
  } else {
    //create order
    try {
      await createOrder(req.session.userId, req.body.address);
      wallet -= cart.total + 50;
      user.wallet = wallet;
      await user.save();

      res.status(200).json({ message: "Order created" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

const checkoutStripe = async (req, res) => {
  const userId = req.session.userId;
  const cart = await Cart.findOne({ user: userId });

  let line_items = [];
  cart.items.map((item) => {
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100, //in cents
      },
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: line_items,
    mode: "payment",
    success_url: "http://localhost:3000/patient/patient-myOrders",
    cancel_url: "http://localhost:3000/patient/patient-cart",
  });

  if (!session)
    return res.status(500).json({ message: "Failed to create the session" });
  else {
    createOrder(req.session.userId, req.body.address);
    res.status(200).json({ url: session.url });
  }
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
  try {
    const order = await Order.findById(orderId);
    if (order) {
      order.status = "Cancelled";
      if (order.paymentMethod != "COD") {
        const patient = await Patient.findById(order.patient);
        patient.wallet += order.totalPrice;
        await patient.save();
      }
      await order.save();
      //reset medicine sales and quantity
      for (let i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        const medicine = await Medicine.findById(item.medicine);
        if (medicine) {
          medicine.sales -= item.quantity;
          medicine.quantity += item.quantity;
          medicine.salesData.map((sale) => {
            //remove sales data
            console.log(sale);
            console.log(order.date);
            console.log(item.quantity);
            if (sale.date == order.date && sale.quantity == item.quantity) {
              console.log("found");
              medicine.salesData.splice(medicine.salesData.indexOf(sale), 1);
            }
          });
          await medicine.save();
        }
      }
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
      if (order.paymentMethod != "COD") {
        const patient = await Patient.findById(order.patient);
        patient.wallet += order.totalPrice;
        await patient.save();
      }
      await order.save();
      //reset medicine sales and quantity
      for (let i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        const medicine = await Medicine.findById(item.medicine);
        if (medicine) {
          medicine.sales -= item.quantity;
          medicine.quantity += item.quantity;
          medicine.salesData.map((sale) => {
            //remove sales data
            if (sale.date == order.date && sale.quantity == item.quantity) {
              medicine.salesData.splice(medicine.salesData.indexOf(sale), 1);
            }
          });
          await medicine.save();
        }
      }
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
  checkoutWallet,
  checkoutStripe,
};
