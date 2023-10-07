const Patient = require("../Models/Patient.js");
const { default: mongoose } = require("mongoose");
const { validateUsername } = require("../utils.js");

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
    });
    await newPatient.save();
    res.status(201).json({ message: "Patient created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const changePatientPassword = async (patientId, oldPassword, newPassword) => {
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      throw new Error("Patient not found");
    }

    // Check if the old password matches the current password
    if (patient.password !== oldPassword) {
      throw new Error("Old password is incorrect");
    }

    patient.password = newPassword;
    await patient.save();

    return patient;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to change password");
  }
};

const updatePatientInfo = async (patientId, updatedInfo) => {
  try {
    const patient = await Patient.findByIdAndUpdate(patientId, updatedInfo, {
      new: true,
    });
    return patient;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update patient information");
  }
};

const deletePatient = async (patientId) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    return deletedPatient;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete patient");
  }
};

const getPatients = async (req, res) => {
  const users = await Patient.find();
  res.status(200).send(users);
};

module.exports = {
  createPatient,
  deletePatient,
  updatePatientInfo,
  changePatientPassword,
  getPatients,
};
