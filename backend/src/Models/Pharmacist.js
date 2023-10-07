const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema(
  {
    picture: {
      data: Buffer, // Store image data as Buffer
      contentType: String, // Specify the content type of the image
      //todo: add default image
    },
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
    hourlyRate: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= 0; // Ensure hourlyRate is a non-negative number
        },
        message: "Hourly rate must be a non-negative number",
      },
    },
    affiliation: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ["Active", "Inactive", "Rejected"],
      default: "Inactive",
    },
  },
  { timestamps: true }
);

const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);
module.exports = Pharmacist;
