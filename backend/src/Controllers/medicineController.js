const Medicine = require("../Models/Medicine");
const fs = require("fs");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ state: "Active" });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArchivedMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ state: "Archived" });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMedicine = async (req, res) => {
  const id = req.query._id;

  try {
    const medicine = await Medicine.findById(id);
    res.status(200).json(medicine);
  } catch (error) {
    res.status(404).json({ message: "Medicine not found" });
  }
};

const searchMedicine = async (req, res) => {
  const name = req.query.name;

  try {
    const medicine = await Medicine.findOne({
      name: { $regex: new RegExp(name, "i") },
      state: "Active",
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
    const sales = await Medicine.find({}, "_id name sales");
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterMedicine = async (req, res) => {
  const medicinalUses = req.body.medicinalUses;

  if (
    !medicinalUses ||
    !Array.isArray(medicinalUses) ||
    medicinalUses.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Medicinal uses not specified or not in array format" });
  }

  try {
    const medicines = await Medicine.find({
      medicinalUse: { $in: medicinalUses },
      state: "Active",
    });
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
    sharp(imageBuffer)
      .resize({ width: 100 }) // Adjust width as needed
      .toBuffer()
      .then((compressedImageBuffer) => {
        const base64ImageData = compressedImageBuffer.toString("base64");
        const imageSrc = `data:image/jpeg;base64,${base64ImageData}`;
        req.body.picture = imageSrc;
      });
  }

  console.log("new medicine", req.body);

  try {
    const medicine = await Medicine.create(req.body);
    // const newMedicine = await medicine.save();
    res.status(200).json(medicine);
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
  const id = req.query._id;

  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, req.query, {
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
    const deletedMedicine = await Medicine.findByIdAndUpdate(
      id,
      { state: "Archived" },
      { new: true }
    );

    if (deletedMedicine) {
      res.status(200).json({ message: "Medicine deleted successfully" });
    } else {
      res.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const unarchiveMedicine = async (req, res) => {
  const id = req.body.id;

  try {
    const deletedMedicine = await Medicine.findByIdAndUpdate(
      id,
      { state: "Active" },
      { new: true }
    );

    if (deletedMedicine) {
      res.status(200).json({ message: "Medicine deleted successfully" });
    } else {
      res.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAlternativeMedicines = async (req, res) => {
  try {
    const { medicineId } = req.body; // Get the ID of the specified medicine from the request body
    const medicine = await Medicine.findOne({ _id: medicineId }); // Find the specified medicine in the database
    if (!medicine) res.status(404).json({ message: "Medicine not found" });
    const alternativeMedicines = await Medicine.find({
      activeIngredients: { $in: medicine.activeIngredients },
      state: "Active",
    }); // Find all medicines that contain any of the active ingredients of the specified medicine
    if (!alternativeMedicines)
      res.status(409).json({ message: "No Alternative Medicines" });
    const index = alternativeMedicines.findIndex(
      (med) => med._id.toString() === medicineId
    ); // Find the index of the specified medicine in the list of alternative medicines
    if (index !== -1) {
      // If the specified medicine is found in the list of alternative medicines
      alternativeMedicines.splice(index, 1);
    }

    res.send(alternativeMedicines); // Return the list of alternative medicines in the response body
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const medicineNamesIds = async (req, res) => {
  try {
    // Use Mongoose to find medicines and project only _id and name fields
    const medicines = await Medicine.find({}, "_id name");

    // Respond with the list of medicines
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve medicines" });
  }
};

const getTotalMonthSales = async (req, res) => {
  try {
    const month = req.query.month; // number from 0 - 11
    console.log(month);
    let s = {
      sales: [],
      totalRevenue: 0,
      totalQuantitySold: 0,
    };
    const medicines = await Medicine.find();
    for (let i = 0; i < medicines.length; i++) {
      let medicine = medicines[i];
      let totalRevenue = 0;
      let totalQuantitySold = 0;
      for (let j = 0; j < medicine.salesData.length; j++) {
        let sale = medicine.salesData[j];

        console.log(sale.date.getMonth());
        if (sale.date.getMonth() == month) {
          totalRevenue += sale.quantity * medicine.price;
          totalQuantitySold += sale.quantity;
        }
      }
      s.sales.push({
        medicineId: medicine._id,
        medicineName: medicine.name,
        totalRevenue: totalRevenue,
        totalQuantitySold: totalQuantitySold,
      });
      s.totalRevenue += totalRevenue;
      s.totalQuantitySold += totalQuantitySold;
    }
    res.status(200).json(s);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFilteredSalesReport = async (req, res) => {
  let { medicineNames, startDate, endDate } = req.query;

  //print current date as a normal date string
  console.log(startDate);
  try {
    let filteredSales = [];

    // Filter sales based on medicineIds or date range
    if (medicineNames && startDate) {
      filteredSales = await Medicine.find({
        name: medicineNames,
      });

      filteredSales = filteredSales.filter((medicine) => {
        for (let i = 0; i < medicine.salesData.length; i++) {
          const sale = medicine.salesData[i];
          const saleDate = sale.date.toISOString().split("T")[0];
          if (saleDate >= startDate && saleDate <= endDate) {
            return true;
          }
        }
        return false;
      });

      //only keep sales within the date range
      filteredSales = filteredSales.filter((medicine) => {
        medicine.salesData = medicine.salesData.filter((sale) => {
          const saleDate = sale.date.toISOString().split("T")[0];
          console.log(saleDate);
          console.log(startDate);

          return saleDate == startDate;
        });
        return medicine.salesData.length > 0;
      });
    } else if (medicineNames) {
      filteredSales = await Medicine.find({ name: medicineNames });
    } else if (startDate) {
      filteredSales = await Medicine.find();

      filteredSales = filteredSales.filter((medicine) => {
        for (let i = 0; i < medicine.salesData.length; i++) {
          const sale = medicine.salesData[i];
          const saleDate = sale.date.toISOString().split("T")[0];
          if (saleDate >= startDate && saleDate <= endDate) {
            return true;
          }
        }
        return false;
      });

      //only keep sales within the date range
      filteredSales = filteredSales.filter((medicine) => {
        medicine.salesData = medicine.salesData.filter((sale) => {
          const saleDate = sale.date.toISOString().split("T")[0];
          console.log(saleDate);
          console.log(startDate);

          return saleDate == startDate;
        });
        return medicine.salesData.length > 0;
      });
    }

    let s = {
      sales: [],
      totalRevenue: 0,
      totalQuantitySold: 0,
    };

    for (let i = 0; i < filteredSales.length; i++) {
      let medicine = filteredSales[i];
      let totalRevenue = 0;
      let totalQuantitySold = 0;
      for (let j = 0; j < medicine.salesData.length; j++) {
        let sale = medicine.salesData[j];
        totalRevenue += sale.quantity * medicine.price;
        totalQuantitySold += sale.quantity;
      }
      s.sales.push({
        medicineId: medicine._id,
        medicineName: medicine.name,
        totalRevenue: totalRevenue,
        totalQuantitySold: totalQuantitySold,
      });
      s.totalRevenue += totalRevenue;
      s.totalQuantitySold += totalQuantitySold;
    }

    res.status(200).json(s);
  } catch (error) {
    console.log(error.message);
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
  medicineNamesIds,
  getAlternativeMedicines,
  getTotalMonthSales,
  getFilteredSalesReport,
  getAllMedicines,
  getArchivedMedicines,
  unarchiveMedicine,
};
