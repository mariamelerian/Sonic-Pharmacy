const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminstratorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: "John Doe",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      default: "abdelaal.ayaa@gmail.com",
    },
  },
  { timestamps: true }
);

const Adminstrator = mongoose.model("Adminstrator", adminstratorSchema);
module.exports = Adminstrator;
