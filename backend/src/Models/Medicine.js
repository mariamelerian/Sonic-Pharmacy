const mongoose = require("mongoose");
const { MedicinalUseArray } = require("./MedicinalUse");
const Pharmacist = require("./Pharmacist"); // Import the Pharmacist model

const medicineSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: false,
  }, // Store the image source as a string
  name: {
    type: String,
    required: false,
    unique: true,
  },
  price: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  sales: {
    type: Number,
    required: false,
    default: 10,
  },

  salesData: {
    type: [
      {
        quantity: {
          type: Number,
          required: false,
        },
        date: {
          type: Date,
          required: false,
          default: Date.now,
        },
      },
    ],
    required: false,
    default: [],
  },
  activeIngredients: {
    type: [String],
    required: false,
  },
  medicinalUse: {
    type: String,
    // enum: MedicinalUseArray,
    required: false,
  },
  state: {
    type: String,
    enum: ["Active", "Archived"],
    default: "Active",
    required: false,
  },
  requiresPrescription: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
