//write functions we'll use a lot

const Adminstrator = require("./Models/Adminstrator");
const Pharmacist = require("./Models/Pharmacist");
const Patient = require("./Models/Patient");

const validateUsername = async (username) => {
  try {
    // check if username already exists in database
    const existingAdmin = await Adminstrator.findOne({ username });
    const existingPatient = await Patient.findOne({ username });
    const existingPharmacist = await Pharmacist.findOne({ username });
    if (existingAdmin || existingPatient || existingPharmacist) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { validateUsername };
