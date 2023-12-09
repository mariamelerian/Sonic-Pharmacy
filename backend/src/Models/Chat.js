const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user1: {
    type: String,
    required: true,
  },
  user2: {
    type: User2,
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

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
