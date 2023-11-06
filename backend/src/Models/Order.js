const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  items: [
    {
      medicine: {
        type: Schema.Types.ObjectId,
        ref: "Medicine", // Reference to the Medicine model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    default: "Pending",
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient", // Reference to the Patient model
    required: true,
  },
  pharmacist: {
    type: Schema.Types.ObjectId,
    ref: "Pharmacist", // Reference to the Pharmacist model
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
