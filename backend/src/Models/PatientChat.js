const mongoose = require("mongoose");

const PatientChatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", // Reference to the Patient model
    required: true,
  },
  messages: [
    {
      sender: {
        type: String,
        enum: ["Patient", "Pharmacist"],
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

const PatientChat = mongoose.model("Chat", PatientChatSchema);

module.exports = PatientChat;
