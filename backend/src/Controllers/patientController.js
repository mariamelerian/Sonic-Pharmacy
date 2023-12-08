const Patient = require("../Models/Patient.js");
const { default: mongoose } = require("mongoose");
const { validateUsername } = require("../utils.js");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { create } = require("../Models/Pharmacist.js");
const bcrypt = require("bcrypt");

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

    newPatient.password = await bcrypt.hash(newPatient.password, 10);
    await newPatient.save();
    const idd = newPatient._id;

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
    throw new Error("Failed to retrieve patient " + error.message);
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
    const id = req.query.id;
    console.log(id);
    const deletedPharmacist = await Patient.findByIdAndDelete(id);
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

const patientChangePassword = async (req, res) => {
  const user = await Patient.findById(req.session.userId);
  console.log("change password " + user);

  if (!user) {
    return res.status(404).json({ error: "Patient not found" });
  }

  const { oldPassword, newPassword } = req.body;
  console.log(oldPassword);

  // Check if the old password is correct
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
  console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    return res.status(409).json({ error: "Invalid old password" });
  }

  // Hash the new password and update the user's document
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  console.log(user.password);
  await user.save();

  return res.status(200).json({ message: "Password updated successfully" });
};

const getDeliveryAddresses = async (req, res) => {
  const userId = req.session.userId;

  try {
    const patient = await Patient.findById(userId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    let addresses = patient.addresses || [];
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve addresses" });
  }
};

const addDeliveryAddress = async (req, res) => {
  const userId = req.session.userId;
  const { address } = req.body;
  try {
    const patient = await Patient.findById(userId);
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
    }
    if (!patient.addresses) {
      patient.addresses = [];
    }
    patient.addresses.push(address);
    await patient.save();
    res.status(200).json(patient.addresses);
  } catch (error) {
    console.log("error adding address" + error.messsage);
    res.status(500).json({ message: "Failed to add address" });
  }
};

const deleteAddress = async (req, res) => {
  const userId = req.session.userId;
  const { address } = req.body;

  try {
    const patient = await Patient.findById(userId);
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
    }
    const index = patient.addresses.indexOf(address);
    if (index > -1) {
      patient.addresses.splice(index, 1);
    }
    await patient.save();
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete address" });
  }
};

const getWallet = async (req, res) => {
  const userId = req.session.userId;
  try {
    const patient = await Patient.findById(userId);
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient.wallet);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve wallet" });
  }
};

module.exports = {
  createPatient,
  deletePatient,
  updatePatientInfo,
  getPatients,
  patientLogin,
  patientChangePassword,
  getPatientById,
  getDeliveryAddresses,
  addDeliveryAddress,
  deleteAddress,
  getWallet,
};
