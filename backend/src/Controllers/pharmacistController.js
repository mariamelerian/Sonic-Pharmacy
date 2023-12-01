const Pharmacist = require("../Models/Pharmacist");
const { validateUsername } = require("../utils");
const fs = require("fs");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");
const Medicine = require("../Models/Medicine");
const emailService = "youstina2307@outlook.com"; // e.g., 'gmail'
const emailUser = "youstina2307@outlook.com";
const emailPassword = "23july2002";

const transporter = nodemailer.createTransport({
  service: emailService,
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "public/uploads"); // Specify the destination directory for uploaded files
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.fieldname + "-" + Date.now() + file.originalname); // Specify how file names are generated
//   },
// });

// const upload = multer({ storage: storage, destination: "public/uploads" });
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    // Your file filter logic here
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // Limit file size to 2MB
  },
}).array("files", 7); // Accept up to 7 files

// const registerPharmacist = async (req, res) => {
//   try {
//     const { username } = req.body;
//     const validation = await validateUsername(username);
//     // check if username already exists in database
//     if (!validation) {
//       return res.status(408).send("Username already exists");
//     }
//     //check if email exists
//     const { email } = req.body;
//     const existing = await Pharmacist.findOne({ email });
//     if (existing) {
//       return res.status(409).json({ message: "Email is already registered" });
//     }
//     //add default picture
//     if (!req.body.picture) {
//       const path = require("path");
//       const filePath = path.join(__dirname, "../res/default-profile-pic.jpg");
//       const imageBuffer = fs.readFileSync(filePath);
//       const base64ImageData = imageBuffer.toString("base64");
//       const imageSrc = `data:image/jpeg;base64,${base64ImageData}`;
//       req.body.picture = imageSrc;
//     }

//     const modifiedReqBody = { ...req.body, files: [] };

//     const newPharmacist = new Pharmacist(modifiedReqBody);
//     newPharmacist.password = await bcrypt.hash(req.body.password, 10);
//     const savedPharmacist = await newPharmacist.save();

//     const id = savedPharmacist._id;

//     uploadDocuments(req, res, id);

//     return res.status(201).json(savedPharmacist);
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };

const registerPharmacist = async (req, res) => {
  try {
    const { username } = req.body;
    const validation = await validateUsername(username);
    // check if username already exists in database
    if (!validation) {
      return res.status(408).send("Username already exists");
    }
    //check if email exists
    const { email } = req.body;
    const existing = await Pharmacist.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email is already registered" });
    }
    //add default picture
    if (!req.body.picture) {
      const path = require("path");
      const filePath = path.join(__dirname, "../res/default-profile-pic.jpg");
      const imageBuffer = fs.readFileSync(filePath);
      const base64ImageData = imageBuffer.toString("base64");
      const imageSrc = `data:image/jpeg;base64,${base64ImageData}`;
      req.body.picture = imageSrc;
    }

    // Create a modified request body with an empty array for files
    const modifiedReqBody = { ...req.body, files: [] };
    console.log("we");
    // Create a new Pharmacist instance with the modified request body
    const newPharmacist = new Pharmacist(modifiedReqBody);
    console.log("we2");
    // Hash the password
    newPharmacist.password = await bcrypt.hash(req.body.password, 10);
    console.log("we3");
    // Save the Pharmacist instance
    const savedPharmacist = await newPharmacist.save();
    const id = savedPharmacist._id;
    console.log("we4");
    // Upload documents and associate them with the pharmacist
    uploadDocuments(req, res, id);
    console.log("we5");
    return res.status(201).json(savedPharmacist);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

// const uploadDocuments = (req, res, pharmacistId) => {
//   console.log(req.body.files);

//   upload.array("files", 7)(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: "Error uploading the files" });
//     }

//     console.log(req.body.files);

//     // Update the pharmacist's licenseDocuments field with the filenames
//     const filenames = req.body.files.map((file) => file.filename);
//     try {
//       const pharmacist = await Pharmacist.findByIdAndUpdate(
//         pharmacistId,
//         { $push: { files: filenames } },
//         { new: true }
//       );
//     } catch (error) {
//       throw new Error("error uploading documents " + error.message);
//     }
//   });
// };

const uploadDocuments = (req, res, pharmacistId) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ message: "Error uploading the files" });
    }

    console.log("Uploaded files:", req.files);

    // Update the pharmacist's files field with the filenames
    const filenames = req.files.map((file) => ({
      filename: file.originalname,
      mimetype: file.mimetype,
      buffer: file.buffer,
    }));

    try {
      const pharmacist = await Pharmacist.findByIdAndUpdate(
        pharmacistId,
        { $push: { files: filenames } },
        { new: true }
      );
      console.log("Files uploaded and associated with the pharmacist.");
    } catch (error) {
      console.error("Error uploading documents:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};

const getPharmacists = async (req, res) => {
  try {
    const pharmacists = await Pharmacist.find({ state: "Active" });

    res.status(200).json(pharmacists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPharmacist = async (req, res) => {
  try {
    const pharmacist = await Pharmacist.findById(req.params.id);
    if (!pharmacist) {
      return res.status(404).json({ error: "Pharmacist not found" });
    }
    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInactivePharmacists = async (req, res) => {
  try {
    const inactivePharmacists = await Pharmacist.find({ state: "Inactive" });
    res.status(200).json(inactivePharmacists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePharmacist = async (req, res) => {
  try {
    const updatedPharmacist = await Pharmacist.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );
    if (updatedPharmacist == null)
      return res.status(404).json({ message: "pharmacist not found." });
    res.status(200).json(updatedPharmacist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePharmacist = async (req, res) => {
  try {
    const deletedPharmacist = await Pharmacist.findByIdAndDelete(req.query._id);
    if (!deletedPharmacist) {
      return res.status(404).json({ error: "Pharmacist not found" });
    }
    res.status(200).json(deletedPharmacist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const pharmacistLogin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // Find the admin using their email address
    const user = await admin.findOne({ username });

    // If the admin wasn't found, respond with an error message
    if (!user) {
      res.status(404).json({ message: "Invalid login credentials" });
      return;
    }

    // Check if the password is correct
    const passwordMatches = await user.checkPassword(password);

    // If the password is incorrect, respond with an error message
    if (!passwordMatches) {
      res.status(409).json({ message: "Invalid login credentials" });
      return;
    }

    // If the email and password are correct, create a session cookie to log the user in

    req.session.user = user;
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};

const outOfStockEmail = async (req, res) => {
  
  try{
  const medicineId=req.body;
  const medicine1 = await Medicine.findById(medicineId);
  if(!medicine1)
  return res.status(404).json({ message:"Medicine not found"});

const pharmacists=await Pharmacist.find();
  const mailOptions = {
    from: emailUser,
    to: pharmacists.map((pharmacist) => pharmacist.email).join(","),
    subject: "Password reset OTP",
    text: `Please note that ${medicine1.name} medicine is out of stock.`,
  };

  await transporter.sendMail(mailOptions);
  return res.status(200).json({message:"Successful"});
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "An error occurred while logging in" });
}
};

const pharmacistChangePassword = async (req, res) => {
  const user = await Pharmacist.findById(req.session.userId);

  if (!user) {
    return res.status(404).json({ error: "Pharmacist not found" });
  }

  const { oldPassword, newPassword } = req.body;

  // Check if the old password is correct
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordCorrect) {
    return res.status(409).json({ error: "Invalid old password" });
  }

  // Hash the new password and update the user's document
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();

  return res.status(200).json({ message: "Password updated successfully" });
};

module.exports = {
  registerPharmacist,
  getPharmacists,
  getPharmacist,
  getInactivePharmacists,
  updatePharmacist,
  deletePharmacist,
  outOfStockEmail,
  pharmacistChangePassword,
};
