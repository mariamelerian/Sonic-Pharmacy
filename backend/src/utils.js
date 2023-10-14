//write functions we'll use a lot

const Adminstrator = require("./Models/Adminstrator");
const Pharmacist = require("./Models/Pharmacist");
const Patient = require("./Models/Patient");
const fs = require("fs");

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

const insertDummyData = (array, model) => {
  array.forEach((element) => {
    if (!element.picture) {
      let picture = {};
      const path = require("path");
      const filePath = path.join(__dirname, "./res/default-medicine-pic.jpg");
      const imageBuffer = fs.readFileSync(filePath);
      const base64ImageData = imageBuffer.toString("base64");
      const imageSrc = `data:image/jpeg;base64,${base64ImageData}`;
      element.picture = imageSrc;
    }
    const newModel = new model(element);
    newModel.save();
  });
};

module.exports = { validateUsername, insertDummyData };
