
const ChatMessage = require("../Models/ChatMessage");
const Patient = require("../Models/Patient.js");
const Pharmacist = require("../Models/Pharmacist");

const sendMessage = async (req, res) => { 
    const { senderId, recipientId, message } = req.body; 
    const sendpat=null;
    const recievpat=null;
    const send=null;
    const sender=null;
    send=Patient.findById({senderId});
    if(send==null){
    send=Pharmacist.findById({senderId});
    if(send==null)
    return res.status(404).json({message:"Sender ID not found"});
else
sender="Pharmacist";}
else
sender="Patient";


    if(sender=="Patient"){
     recievpat=await Pharmacist.findById({senderId});
     if(recievpat==null){
        return res.status(404).json({message:"Pharmacist Reciever not found"});
    }}
     else if(sender=="Pharmacist"){
        recievpat=await Patient.findById({senderId});
    if(recievpat==null){
        return res.status(404).json({message:"Patient Reciever not found"});
    }
    }
        else{
            return res.status(404).json({message:"Invalid sender type"});
        }

    const newMessage = new ChatMessage({ senderId, recipientId,message,sender }); 
    await newMessage.save();};

    const getChat = async (req, res) => {
        const { pharmacistId, patientId } = req.query; // Get the IDs of the Pharmacist and Patient from the query parameters
        const messages = await ChatMessage.find({ $or: [{ senderId: pharmacistId, receiverId: patientId }, { senderId: patientId, receiverId: pharmacistId }] }); 
        // Find all chat messages between the specified Pharmacist and Patient using $or query operator
        res.status(200).send(messages); // Return the list of chat messages in the response body
      };

      module.exports={getChat,
        sendMessage,
      };