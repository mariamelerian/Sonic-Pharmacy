const Medicine = require("../Models/Medicine");
const fs = require("fs");

const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMedicine = async (req, res) => {
  const id = req.body.id;

  try {
    const medicine = await Medicine.findById(id);
    res.status(200).json(medicine);
  } catch (error) {
    res.status(404).json({ message: "Medicine not found" });
  }
};

const searchMedicine = async (req, res) => {
  const name = req.body.name;

  try {
    const medicine = await Medicine.findOne({
      name: { $regex: new RegExp(name, "i") },
    });
    if (medicine) {
      res.status(200).json(medicine);
    } else {
      res.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMedicineSale = async (req, res) => {
  try {
    const medicines = await Medicine.find({}, "name quantity sales");
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterMedicine = async (req, res) => {
  if (!req.body.medicinalUse)
    return res.status(400).json({ message: "Medicinal use not specified" });
  const medicinalUse = req.body.medicinalUse;

  try {
    const medicines = await Medicine.find({ medicinalUse: medicinalUse });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMedicine = async (req, res) => {
  if (!req.body.picture) {
    let picture = {};
    const path = require("path");
    const filePath = path.join(__dirname, "../res/default-medicine-pic.jpg");
    const imageBuffer = fs.readFileSync(filePath);
    const base64ImageData = imageBuffer.toString("base64");
    const imageSrc = `data:image/jpeg;base64,${base64ImageData}`;
    req.body.picture = imageSrc;
  }

  const medicine = new Medicine(req.body);

  try {
    const newMedicine = await medicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (E11000)
      res.status(409).json({
        message: "Duplicate key error. Medicine with this name already exists.",
      });
    } else {
      // Other errors
      res.status(500).json({ message: "Internal server error." });
    }
  }
};

const updateMedicine = async (req, res) => {
  const id = req.body.id;

  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMedicine)
      return res.status(404).json({ message: "Medicine not found" });
    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMedicine = async (req, res) => {
  const id = req.body.id;

  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(id);

    if (deletedMedicine) {
      res.status(200).json({ message: "Medicine deleted successfully" });
    } else {
      res.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMedicines,
  getMedicine,
  getMedicineSale,
  searchMedicine,
  filterMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
