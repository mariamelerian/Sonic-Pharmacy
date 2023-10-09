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
const changePatientPassword = async (req, res) => {
  const { _id, password, newPassword } = req.body;
  try {
    const patient = await Patient.findById(_id);
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    // Check if the old password matches the current password
    if (patient.password) {
      if (patient.password != password) {
        res.status(409).json({ message: "old password incorrect" });
        return;
      }
    }

    patient.password = newPassword;
    await patient.save();

    return patient;
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: "Failed to change Password" });
  }
};

const updatePatientInfo = async (req, res) => {
  const newpatient = req.body;
  try {
    const patient = await Patient.findByIdAndUpdate(req.body.id, newpatient, {
      new: true,
    });
    return patient;
  } catch (error) {
    console.error(error);
    return res
      .status(409)
      .json({ message: "Failed to update patient's information" });
  }
};

const deletePatient = async (req, res) => {
  const patientId = req.body;
  try {
    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    return deletedPatient;
  } catch (error) {
    console.error(error);
    return res.status(409).json({ message: "Failed to delete patient" });
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
