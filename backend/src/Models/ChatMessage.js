const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
      unique: true,
    },
    recieverId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    sender: {
        type: String,
        required: true,
        enum: ["Pharmacist", "Patient"],
      },
  },
  { timestamps: true }
);

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
module.exports = ChatMessage;
