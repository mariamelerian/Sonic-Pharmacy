const Pharmacist = require("../Models/Pharmacist");
const { validateUsername } = require("../utils");
const fs = require("fs");

const registerPharmacist = async (req, res) => {
  try {
    const { username } = req.body;
    const validation = await validateUsername(username);
    // check if username already exists in database
    if (!validation) {
      return res.status(409).send("Username already exists");
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
    const pharmacists = await Pharmacist.find();
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
    const deletedPharmacist = await Pharmacist.findByIdAndDelete(req.params.id);
    if (!deletedPharmacist) {
      return res.status(404).json({ error: "Pharmacist not found" });
    }
    res.status(200).json(deletedPharmacist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerPharmacist,
  getPharmacists,
  getPharmacist,
  getInactivePharmacists,
  updatePharmacist,
  deletePharmacist,
};
