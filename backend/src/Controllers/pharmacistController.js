const Pharmacist = require("../Models/Pharmacist");
const { validateUsername } = require("../utils");

const registerPharmacist = async (req, res) => {
  try {
    const { username } = req.body;
    if (!validateUsername(username))
      res.status(409).send("Username already exists");
    //check if email exists
    const existing = await Pharmacist.findOne({ email });
    if (existing) {
      return res.status(40).json({ message: "Email is already registered" });
    }
    const newPharmacist = new Pharmacist(req.body);
    const savedPharmacist = await newPharmacist.save();
    res.status(201).json(savedPharmacist);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    const pharmacist = await Pharmacist.findById(req.body.id);
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
