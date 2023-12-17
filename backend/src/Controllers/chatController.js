const Patient = require("../Models/Patient.js");
const Pharmacist = require("../Models/Pharmacist.js");
const PatientChat = require("../Models/PatientChat.js");
const chatModel = require("../Models/Chat.js");
const patientModel = require("../Models/Patient.js");
const doctorModel = require("../Models/Doctor.js");
// const createNewChat = async (req, res) => {
//   const { user1, user2, chatName, user1Type, user2Type } = req.body;
//   const chat = await Chat.create({
//     user1,
//     user2,
//     user1Type,
//     user2Type,
//     chatName,
//   });
//   res.status(201).send(chat);
// };

// const sendPatientMessage = async (req, res) => {
//   const { sender, content } = req.body;
//   const patientId = req.session.userId;
//   const chat = await PatientChat.findOne({ userId: patientId });
//   if (!chat) {
//     const newChat = await PatientChat.create({ userId: patiendId });
//     newChat.messages.push({ sender, content });
//     await newChat.save();
//     res.status(200).send(newChat);
//     return;
//   } else {
//     console.log("chat function" + chat.messages);
//     chat.messages.push({ sender: sender, content: content });
//     await chat.save();
//     res.status(200).send(chat);
//   }
// };

// const patientChat = async (req, res) => {
//   patientId = req.session.userId;

//   const chat = await PatientChat.findOne({ userId: patientId });
//   if (!chat) {
//     const newChat = await PatientChat.create({ userId: patientId });
//     res.status(200).send(newChat);
//     return;
//   }
//   res.status(200).send(chat);
// };

// const getChats = async (req, res) => {
//   //get chats for a user
//   const { userId } = req.query;
//   const chats = await Chat.find({
//     $or: [{ user1: userId }, { user2: userId }],
//   });
//   res.status(200).send(chats);
// };

// const getChatsWithDoctors = async (req, res) => {
//   const { userId } = req.query;
//   const chats = await Chat.find({
//     $or: [
//       { user1: userId, user2Type: "Doctor" },
//       { user2: userId, user1Type: "Doctor" },
//     ],
//   });
//   res.status(200).send(chats);
// };

// const getChatsWithPharmacists = async (req, res) => {
//   const { userId } = req.query;
//   const chats = await Chat.find({
//     $or: [
//       { user1: userId, user2Type: "Pharmacist" },
//       { user2: userId, user1Type: "Pharmacist" },
//     ],
//   });
//   res.status(200).send(chats);
// };

// const getChat = async (req, res) => {
//   const { chatId } = req.params;
//   const chat = await Chat.findById(chatId);
//   console.log(chat);
//   res.status(200).send(chat);
// };

// const sendMessage = async (req, res) => {
//   const { chatId, sender, content } = req.body;
//   const chat = await Chat.findById(chatId);
//   chat.messages.push({ sender, content });
//   await chat.save();
//   res.status(200).send(chat);
// };

const viewChat = async (req, res) => {
  const userID = req.session.userId;
  const recipientID = req.body._id;

  // let isDoctor = false;
  // let isPharmacist = false;

   try {
  //   // Check if the user is a doctor
  //   const doctor = await doctorModel.findById(userID);
  //   if (doctor) {
  //     isDoctor = true;
  //   } else {
  //     // Check if the user is a pharmacist
  //     const pharmacist = await Pharmacist.findById(userID);
  //     if (pharmacist) {
  //       isPharmacist = true;
  //     }
  //   }

  //   // Determine the user field (doctorID, patientID, or pharmacistID) based on the user type
  //   let userID2, recipientID2;

  //   if (isDoctor) {
  //     userID2 = recipientID;
  //     recipientID2 = userID;
  //   } else if (isPharmacist) {
  //     userID2 = recipientID;
  //     recipientID2 = userID;
  //   } else {
  //     const patient = await patientModel.findById(userID);
  //     if (patient) {
  //       userID2 = recipientID;
  //       recipientID2 = userID;
  //     } else {
  //       // The user is neither a doctor nor a pharmacist, so handle the case accordingly
  //       return res.status(404).json("Invalid user type");
  //     }
  //   }

    const chat = await chatModel.findOne({
      $or: [
        { patientID: userID, doctorID: recipientID },
        { patientID: recipientID, doctorID: userID},
        { pharmacistID: recipientID, doctorID: userID },
        { doctorID: recipientID, pharmacistID: userID },
        { patientID: recipientID, pharmacistID: userID },
        { pharmacistID: recipientID, patientID: userID },
      ],
    });

    if (!chat) {
      return res.status(404).json("No messages");
    }
  //   if(chat){
  //   if(chat.flag){
  //   chat.flag=false;
  //   await chat.save();
  //   }
  // }
    
    
    return res.status(200).json({ chat });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewChats = async (req, res) => {
  const userID = req.session.userId;
  let isDoctor = false;
  let isPharmacist = false;
  console.log(req.session.userId);
  try {
    // Check if the user is a doctor
    const doctor = await doctorModel.findById(userID);
    
    if (doctor) {
      isDoctor = true;
    } else {
      // Check if the user is a pharmacist
      const pharmacist = await Pharmacist.findById(userID);
      if (pharmacist) {
        isPharmacist = true;
      }
    }

    // Extract names from the populated data
    let chatNames = [];

    if (isDoctor) {
      // User is a doctor, get all patients
      const patients = doctor.patients;
      for (const patient of patients) {
        const currPatient = await patientModel.findById(patient);
        if (currPatient) {
          const chat = await chatModel.findOne({ patientID: currPatient._id , doctorID: userID });
           if(chat){
            chatNames.push(currPatient.name + "-" + currPatient._id+"-"+chat.flag);
           }
           else{
          chatNames.push(currPatient.name + "-" + currPatient._id);
           }
        }
      }
      const allPharmacists = await Pharmacist.find();
      if (allPharmacists) {
        for (const pharmacist of allPharmacists) {
            const chat = await chatModel.findOne({ pharmacistID: pharmacist._id , doctorID: userID });
             if(chat){
              chatNames.push(
                "Pharmacist " + pharmacist.name + "-" + pharmacist._id+"-"+chat.flag);
             }
             else{
              chatNames.push(
                "Pharmacist " + pharmacist.name + "-" + pharmacist._id
              );
             }
        }
      }
    } else if (isPharmacist) {
      // User is a pharmacist, get all patients and all doctors
      const allPatients = await patientModel.find();
      for (const currPatient of allPatients) {
          const chat = await chatModel.findOne({ patientID: currPatient._id , pharmacistID: userID });
           if(chat){
            chatNames.push(currPatient.name + "-" + currPatient._id+"-"+chat.flag);
           }
           else{
          chatNames.push(currPatient.name + "-" + currPatient._id);
           }
      }

      const allDoctors = await doctorModel.find();
      for (const doc of allDoctors) {
        const chat = await chatModel.findOne({ doctorID: doc._id, pharmacistID: userID });
        if(chat){
          chatNames.push("Dr. " + doc.name + "-" + doc._id+"-"+ chat.flag);
        }
        else{
       chatNames.push("Dr. " + doc.name + "-" + doc._id);
        }
      }
    } else {
      const allPharmacists = await Pharmacist.find();
      if (allPharmacists) {
        for (const pharmacist of allPharmacists) {
            const chat = await chatModel.findOne({ patientID: userID, pharmacistID: pharmacist._id });
             if(chat){
              chatNames.push(
                "Pharmacist " + pharmacist.name + "-" + pharmacist._id+"-"+chat.flag);
             }
             else{
              chatNames.push(
                "Pharmacist " + pharmacist.name + "-" + pharmacist._id
              );
             }
        }
      }
    }

    chatNames = Array.from(new Set(chatNames));
    return res.status(200).json({ chatNames });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendMessage = async (req, res) => {
  const recipientID = req.body.recipientID;
  const message = req.body.message;
  const userID = req.session.userId;
  const currentDate = new Date();
  const currDate = currentDate.toISOString().split("T")[0];
  const currTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  let senderTitle;
  let isDoctor = false;
  let isPharmacist = false;

  let isDoctor2 = false;
  let isPharmacist2 = false;

  let patient;
  let doctor;
  let pharmacist;

  try {
    // Check if the user is a patient
    patient = await patientModel.findById(userID);
    if (patient) {
      isDoctor = false;
      isPharmacist = false;
      senderTitle = "patient";
    } else {
      // Check if the user is a doctor
      doctor = await doctorModel.findById(userID);
      if (doctor) {
        isDoctor = true;
        isPharmacist = false;
        senderTitle = "doctor";
      } else {
        // Check if the user is a pharmacist
        pharmacist = await Pharmacist.findById(userID);
        if (pharmacist) {
          isDoctor = false;
          isPharmacist = true;
          senderTitle = "pharmacist";
        }
      }
    }

    // Check if the recipient is a doctor
    doctor = await doctorModel.findById(recipientID);
    if (doctor) {
      isDoctor2 = true;
      isPharmacist2 = false;
    } else {
      // Check if the recipient is a pharmacist
      pharmacist = await Pharmacist.findById(recipientID);
      if (pharmacist) {
        isDoctor2 = false;
        isPharmacist2 = true;
      }
    }

    // Check if there is an existing chat
    const existingChat = await chatModel.findOne({
      $or: [
        { patientID: recipientID, doctorID: userID },
        { patientID: userID, doctorID: recipientID },
        { patientID: recipientID, pharmacistID: userID },
        { patientID: userID, pharmacistID: recipientID },
        { doctorID: recipientID, pharmacistID: userID },
        { doctorID: userID, pharmacistID: recipientID },
      ],
    });
    
    if (!existingChat) {
      // Create a new chat
      let pNew = null;
      let phNew = null;
      let docNew = null;
      if (isDoctor) {
        docNew = userID;
      }
      if (isDoctor2) {
        docNew = recipientID;
      }
      if (isPharmacist) {
        phNew = userID;
      }
      if (isPharmacist2) {
        phNew = recipientID;
      }
      if (!isDoctor && !isPharmacist) {
        pNew = userID;
      }
      if (!isDoctor2 && !isPharmacist2) {
        pNew = recipientID;
      }
      if (!isDoctor && isPharmacist2) {
        pNew = userID;
      }
      if (!isPharmacist && isDoctor2) {
        pNew = userID;
      }
      if (!isDoctor2 && isPharmacist) {
        pNew = recipientID;
      }
      if (isDoctor && !isPharmacist2) {
        pNew = recipientID;
      }

      // Create a new chat
      const newChatData = {
        patientID: pNew,
        doctorID: docNew,
        pharmacistID: phNew,
        messages: [[senderTitle, currDate, currTime, message]],
        flag: true,
      };

      const newChat = await chatModel.create(newChatData);
      await newChat.save();

      return res.status(200).json(newChat);
    } else {
      // Add message to the existing chat
      existingChat.messages.push([senderTitle, currDate, currTime, message]);
      existingChat.flag = true;
      await existingChat.save();

      return res.status(200).json(existingChat);
    }
  } catch (error) {
    console.error(error);  // Add this line to log the error
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const addChat = async (req, res) => {
  const newChat = await chatModel.create({
    patientID: "21345678",
    doctorID: "31245678",
    messages: [["patient", "24-22-2002", "23:00", "lol"]],
  });
  return res.status(200).json(newChat);
};

module.exports = {
  // getChat,
  // sendMessage,
  // getChats,
  // createNewChat,
  // sendPatientMessage,
  // sendPatientMessage,
  // patientChat,
  // getChatsWithDoctors,
  // getChatsWithPharmacists,
  viewChat,
  viewChats,
  sendMessage,
  addChat,
};
