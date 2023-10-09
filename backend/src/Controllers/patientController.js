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
  const patientId = req.body.id;
  const password = req.body.password;
  const newPassword = req.body.newPassword;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (patient.password !== password) {
      return res.status(409).json({ message: "Old password incorrect" });
    }

    patient.password = newPassword;
    await patient.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to change password" });
  }
};

const updatePatientInfo = async (req, res) => {
  try {
    const updatedPharmacist = await Patient.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );
    if (updatedPharmacist == null)
      return res.status(404).json({ message: "patient not found." });
    res.status(200).json(updatedPharmacist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePatient = async (req,res) => {
  try {
    const deletedPharmacist = await Patient.findByIdAndDelete(req.body.id);
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

module.exports = {
  createPatient,
  deletePatient,
  updatePatientInfo,
  changePatientPassword,
  getPatients,
};
