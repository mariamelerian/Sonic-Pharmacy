const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  user1: {
    type: String, // Reference to the User model
    required: true,
  },
  user2: {
    type: String,
    ref: "User", // Reference to the User model
    required: true,
  },
  user1Type: {
    type: String,
    enum: ["Doctor", "Pharmacist"],
    required: true,
  },
  user2Type: {
    type: String,
    enum: ["Doctor", "Pharmacist"],
    required: true,
  },
  chatName: {
    type: String,
    required: true,
  },
  messages: [
    {
      sender: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  default: [],
});

const Chat = mongoose.model("SystemChat", ChatSchema);
module.exports = Chat;
