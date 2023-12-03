const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    emergencyFullName: {
      type: String,
      required: true,
    },
    emergencyMobileNumber: {
      type: String,
      required: true,
    },
    emergencyRelation: {
      type: String,
      required: true,
    },
    addresses: {
      type: [String], // Assuming an array of strings for active ingredients
      default: [],
    },
    wallet: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
