const Patient = require("../Models/Patient.js");
const Pharmacist = require("../Models/Pharmacist");
const Chat = require("../Models/Chat.js");

const createNewChat = async (req, res) => {
  const { user1, user2, chatName } = req.body;
  const chat = await Chat.create({ user1, user2, chatName });
  res.status(201).send(chat);
};

const getChats = async (req, res) => {
  //get chats for a user
  const { userId } = req.query;
  const chats = await Chat.find({
    $or: [{ user1: userId }, { user2: userId }],
  });
  res.status(200).send(chats);
};

const getChat = async (req, res) => {
  const { chatId } = req.params;
  const chat = await Chat.findById(chatId);
  res.status(200).send(chat);
};

const sendMessage = async (req, res) => {
  const { chatId, sender, content } = req.body;
  const chat = await Chat.findById(chatId);
  chat.messages.push({ sender, content });
  await chat.save();
  res.status(200).send(chat);
};

exports.default = {
  createNewChat,
  getChats,
  getChat,
  sendMessage,
};
