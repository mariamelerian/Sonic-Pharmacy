const Patient = require("../Models/Patient.js");
const Pharmacist = require("../Models/Pharmacist");
const PatientChat = require("../Models/PatientChat.js");
const Chat = require("../Models/Chat.js");

const createNewChat = async (req, res) => {
  const { user1, user2, chatName, user1Type, user2Type } = req.body;
  const chat = await Chat.create({
    user1,
    user2,
    user1Type,
    user2Type,
    chatName,
  });
  res.status(201).send(chat);
};

const sendPatientMessage = async (req, res) => {
  const { sender, content } = req.body;
  const patientId = req.session.userId;
  const chat = await PatientChat.findOne({ userId: patientId });
  if (!chat) {
    const newChat = await PatientChat.create({ userId: patiendId });
    newChat.messages.push({ sender, content });
    await newChat.save();
    res.status(200).send(newChat);
    return;
  } else {
    console.log("chat function" + chat.messages);
    chat.messages.push({ sender: sender, content: content });
    await chat.save();
    res.status(200).send(chat);
  }
};

const patientChat = async (req, res) => {
  patientId = req.session.userId;

  const chat = await PatientChat.findOne({ userId: patientId });
  if (!chat) {
    const newChat = await PatientChat.create({ userId: patientId });
    res.status(200).send(newChat);
    return;
  }
  res.status(200).send(chat);
};

const getChats = async (req, res) => {
  //get chats for a user
  const { userId } = req.query;
  const chats = await Chat.find({
    $or: [{ user1: userId }, { user2: userId }],
  });
  res.status(200).send(chats);
};

const getChatsWithDoctors = async (req, res) => {
  const { userId } = req.query;
  const chats = await Chat.find({
    $or: [
      { user1: userId, user2Type: "Doctor" },
      { user2: userId, user1Type: "Doctor" },
    ],
  });
  res.status(200).send(chats);
};

const getChatsWithPharmacists = async (req, res) => {
  const { userId } = req.query;
  const chats = await Chat.find({
    $or: [
      { user1: userId, user2Type: "Pharmacist" },
      { user2: userId, user1Type: "Pharmacist" },
    ],
  });
  res.status(200).send(chats);
};

const getChat = async (req, res) => {
  const { chatId } = req.params;
  const chat = await Chat.findById(chatId);
  console.log(chat);
  res.status(200).send(chat);
};

const sendMessage = async (req, res) => {
  const { chatId, sender, content } = req.body;
  const chat = await Chat.findById(chatId);
  chat.messages.push({ sender, content });
  await chat.save();
  res.status(200).send(chat);
};

module.exports = {
  getChat,
  sendMessage,
  getChats,
  createNewChat,
  sendPatientMessage,
  sendPatientMessage,
  patientChat,
  getChatsWithDoctors,
  getChatsWithPharmacists,
};
