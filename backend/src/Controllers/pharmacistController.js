const Pharmacist = require("../Models/Pharmacist");
const { validateUsername } = require("../utils");
const fs = require("fs");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

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
    const newPharmacist = new Pharmacist(req.body);
    const savedPharmacist = await newPharmacist.save();
    return res.status(201).json(savedPharmacist);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
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
      req.params.id,
      req.params,
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
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};


const pharmacistSendPasswordResetOTP = async (req, res) => {
  // Find the user with the given email address
  const user = await Pharmacist.findOneByID(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found"});
  }
  const email=user.email;

  // Generate a new OTP
  const OTP = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

  // Save the OTP and its expiry time to the user's document
  user.passwordReset.OTP = OTP;
  user.passwordReset.OTP_expiry = new Date(Date.now() + 30 * 60000); // OTP is valid for 30 minutes
  await user.save();

  // Send an email with the OTP to the user
  const transporter = nodemailer.createTransport({
    // Replace with your email service and credentials
    service: "gmail",
    auth: {
      user: "your_email@example.com",
      pass: "your_email_password",
    },
  });

  const mailOptions = {
    from: "your_email@example.com",
    to: user.email,
    subject: "Password reset OTP",
    text: `Your password reset OTP is ${OTP}. It will be valid for the next 30 minutes. If you didn't request a password reset,
     please ignore this email.`,
  };

  await transporter.sendMail(mailOptions);
};
const pharmacistCheckPasswordResetOTP = async (req, res) =>{
  // Find the user with the given email address
  
  
  const user = await Pharmacist.findOneByID(req.params.id);
  
  if (!user) {
    return res.status(404).json({ error: "User not found"});
  }
  const OTP=user.passwordReset.OTP;
  // Check if the OTP provided by the user matches the OTP stored in the document
  if (user.passwordReset.OTP !== OTP) {
    return res.status(409).json({ error: "InValid OTP"});
  }

  // Check if the OTP has expired (it's valid for 30 minutes)
  if (user.passwordReset.OTP_expiry.getTime() < Date.now()) {
    return res.status(409).json({ error: "OTP expired"});
  }

  // If the OTP is valid, return true
  return res.status(200).json({ error: "Successful"});
};

const pharmacistChangePassword = async (req, res) => {
  const user = await Pharmacist.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'Pharmacist not found' });
  }

  const { oldPassword, newPassword } = req.body;

  // Check if the old password is correct
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordCorrect) {
    return res.status(409).json({ error: 'Invalid old password' });
  }

  // Hash the new password and update the user's document
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();

  return res.status(200).json({ message: 'Password updated successfully' });
};

module.exports = {
  registerPharmacist,
  getPharmacists,
  getPharmacist,
  getInactivePharmacists,
  updatePharmacist,
  deletePharmacist,
  pharmacistLogin,
  pharmacistSendPasswordResetOTP,
  pharmacistCheckPasswordResetOTP,
  pharmacistChangePassword
};
