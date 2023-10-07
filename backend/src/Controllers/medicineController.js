const Medicine = require("../Models/Medicine"); // Assuming your Medicine model file is named 'Medicine.js'

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

const getMedicineByName = async (req, res) => {
  const name = req.body.name;

  try {
    const medicine = await Medicine.findOne({ name: name });
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

const searchMedicine = async (req, res) => {
  const searchTerm = req.body.name;

  try {
    const medicines = await Medicine.find({
      name: { $regex: new RegExp(searchTerm, "i") },
    });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterMedicine = async (req, res) => {
  const medicinalUse = req.body.medicinalUse;

  try {
    const medicines = await Medicine.find({ medicinalUse: medicinalUse });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMedicine = async (req, res) => {
  const {
    name,
    price,
    description,
    quantity,
    activeIngredients,
    medicinalUse,
  } = req.body;

  const medicine = new Medicine({
    name,
    price,
    description,
    quantity,
    activeIngredients,
    medicinalUse,
  });

  try {
    const newMedicine = await medicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMedicine = async (req, res) => {
  const id = req.body.id;

  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMedicine = async (req, res) => {
  const id = req.params.id;

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
  getMedicineByName,
  getMedicineSale,
  searchMedicine,
  filterMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
