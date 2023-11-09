const Patient = require("../Models/Patient.js");
const { default: mongoose } = require("mongoose");
const { validateUsername } = require("../utils.js");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Address = require("../models/address");

const stripe = require("stripe")("<your_stripe_secret_key>");

const createPatient = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    dateOfBirth,
    gender,
    mobileNumber,
    emergencyFullName,
    emergencyMobileNumber,
    emergencyRelation,
  } = req.body;
  try {
    const validation = await validateUsername(username);
    // check if username already exists in database
    if (!validation) {
      return res.status(409).json({ message: "Username already taken" });
    }
    //check if email already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(409).json({ message: "Email is already registered" });
    }
    // create a new patient with the provided information
    const newPatient = new Patient({
      username,
      name,
      email,
      password,
      dateOfBirth,
      gender,
      mobileNumber,
      emergencyFullName,
      emergencyMobileNumber,
      emergencyRelation,
    });
    await newPatient.save();
    res.status(201).json({ message: "Patient created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    // Use Mongoose to find the patient by ID
    const patient = await Patient.findById(patientId);

    if (!patient) {
      // If the patient is not found, return an error or handle it as needed
      res.status(404).json({ message: "patient not found" }); // You can return null or throw an error
    }

    // Return the patient data if found
    res.status(200).json(patient);
  } catch (error) {
    // Handle any errors that may occur during the database query
    throw new Error("Failed to retrieve patient");
  }
};

const updatePatientInfo = async (req, res) => {
  try {
    const updatedPharmacist = await Patient.findByIdAndUpdate(
      req.params.id,
      req.params,
      { new: true }
    );
    if (updatedPharmacist == null)
      return res.status(404).json({ message: "patient not found." });
    res.status(200).json(updatedPharmacist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const deletedPharmacist = await Patient.findByIdAndDelete(req.query._id);
    if (!deletedPharmacist) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.status(200).json(deletedPharmacist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatients = async (req, res) => {
  const users = await Patient.find();
  res.status(200).send(users);
};

const patientLogin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // Find the admin using their email address
    const user = await Patient.findOne({ username });

    // If the admin wasn't found, respond with an error message
    if (!user) {
      res.status(404).json({ message: "Invalid login credentials" });
      return;
    }

    // Check if the password is correct
    const passwordMatches = await user.checkPassword(password);

    // If the password is incorrect, respond with an error message
    if (!passwordMatches) {
      return res.status(409).json({ message: "Invalid login credentials" });
    }

    // If the email and password are correct, create a session cookie to log the user in

    req.session.user = user;
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};

const patientSendPasswordResetOTP = async function (req, res) {
  // Find the user with the given email address

  const user = await Patient.findOneByID(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Generate a new OTP
  const OTP = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

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
const patientCheckPasswordResetOTP = async function (req, res) {
  // Find the user with the given email address
  const email = req.email;
  const OTP = req.OTP;
  const user = await Patient.findOneByID(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Check if the OTP provided by the user matches the OTP stored in the document
  if (user.passwordReset.OTP !== OTP) {
    return res.status(409).json({ error: "InValid OTP" });
  }

  // Check if the OTP has expired (it's valid for 30 minutes)
  if (user.passwordReset.OTP_expiry.getTime() < Date.now()) {
    return res.status(409).json({ error: "OTP expired" });
  }

  // If the OTP is valid, return true
  return res.status(200).json({ error: "Successful" });
};

const patientChangePassword = async (req, res) => {
  const user = await Patient.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "Patient not found" });
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

//dont forget to put stripe secret key at line 8
const createCustomer = async (req, res) => {
  const user = await Patient.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "Patient not found" });
  }
  const name = user.name;
  const email = user.email;
  const card = req.card;

  const paymentMethod = await stripe.paymentMethods.create({
    type: "card",
    card: {
      number: card.number,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
      cvc: card.cvc,
    },
  });

  const customer = await stripe.customers.create({
    name: name,
    email: email,
    payment_method: paymentMethod.id,
    invoice_settings: {
      default_payment_method: paymentMethod.id,
    },
  });

  return res.status(200).json({
    customerId: customer.id,
    card_last4: paymentMethod.card.last4,
    card_exp_month: paymentMethod.card.exp_month,
    card_exp_year: paymentMethod.card.exp_year,
  });
};

const chargePayment = async (req, res) => {
  const user = await Patient.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "Patient not found" });
  }
  const customerId = req.params.id;
  const amount = req.amount;
  const currency = req.currency;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: currency,
    payment_method: customerId,
    off_session: true, // Set to true for one-time payments
    confirm: true, // Confirm the payment right away
  });

  // Check the status of the payment intent
  switch (paymentIntent.status) {
    case "requires_action":
    case "requires_source_action":
      // Additional action required (e.g. 3DS authentication)
      return {
        status: "pending",
        client_secret: paymentIntent.client_secret,
      };
    case "succeeded":
      // Payment confirmed and complete
      return res
        .status(200)
        .json({ status: "paid", paymentId: paymentIntent.id });
    default:
      // Payment failed (or unknown status)
      return res.status(409).json({ status: "failed" });
  }
};

const addAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userId, Country, City, Street, Building } = req.body;

    const address = new Address({ userId, Country, City, Street, Building });
    await address.save();

    res.status(201).json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add address" });
  }
};

const deleteAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userId } = req.params;
    const { addressId } = req.body;

    const address = await Address.findOneAndDelete({ addressId, userId });
    if (!address) {
      res.status(404).json({ error: "Address not found" });
    } else {
      res.json(address);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete address" });
  }
};

const updateAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { addressId, Country, City, Street, Building } = req.body;

    const address = await Address.findOneAndUpdate(
      { addressId },
      { Country, City, Street, Building },
      { new: true }
    );

    if (!address) {
      res.status(404).json({ error: "Address not found" });
    } else {
      res.json(address);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update address" });
  }
};

const viewAddresses = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userId } = req.params;

    const addresses = await Address.find({ userId });
    if (!addresses || addresses.length === 0) {
      res.status(404).json({ error: "Addresses not found" });
    } else {
      res.json(addresses);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get addresses" });
  }
};

module.exports = {
  createPatient,
  deletePatient,
  updatePatientInfo,
  getPatients,
  patientLogin,
  patientSendPasswordResetOTP,
  patientCheckPasswordResetOTP,
  patientChangePassword,
  createCustomer,
  chargePayment,
  getPatientById,
  addAddress,
  updateAddress,
  viewAddresses,
  deleteAddress,
};
