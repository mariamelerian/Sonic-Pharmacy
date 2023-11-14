//write functions we'll use a lot

const Adminstrator = require("./Models/Adminstrator");
const Pharmacist = require("./Models/Pharmacist");
const Patient = require("./Models/Patient");
const Order = require("./Models/Order");
const fs = require("fs");
const bcrypt = require("bcrypt");
const validateUsername = async (username) => {
  try {
    console.log(username);
    // check if username already exists in database
    const existingAdmin = await Adminstrator.findOne({ username: username });
    const existingPatient = await Patient.findOne({ username: username });
    const existingPharmacist = await Pharmacist.findOne({ username: username });
    if (existingAdmin || existingPatient || existingPharmacist) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};

const insertDummyDataPatient = async (array) => {
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

    const newPatient = new Patient(element);

    passwordandsavePatient(newPatient);
  });
};

const passwordandsavePatient = async (newPatient) => {
  newPatient.password = await bcrypt.hash(newPatient.password, 10);
  await newPatient.save();
  const idd = newPatient._id;
};

const insertDummyDataAdmin = async (array) => {
  array.forEach((element) => {
    const newPatient = new Adminstrator(element);

    passwordandsaveAdmin(newPatient);
  });
};

const passwordandsaveAdmin = async (newPatient) => {
  newPatient.password = await bcrypt.hash(newPatient.password, 10);
  await newPatient.save();
};

const insertDummyDataPharmacist = async (array) => {
  array.forEach((element) => {
    /*
    if (!element.picture) {
      let picture = {};
      const path = require("path");
      const filePath = path.join(__dirname, "./res/default-medicine-pic.jpg");
      const imageBuffer = fs.readFileSync(filePath);
      const base64ImageData = imageBuffer.toString("base64");
      const imageSrc = `data:image/jpeg;base64,${base64ImageData}`;
      element.picture = imageSrc;
    }
    */

    const newPatient = new Pharmacist(element);

    passwordandsavePharmacist(newPatient);
  });
};

const passwordandsavePharmacist = async (newPatient) => {
  newPatient.password = await bcrypt.hash(newPatient.password, 10);
  await newPatient.save();
};

const insertDummyDataOrder = async (array) => {
  array.forEach((element) => {
    const newPatient = new Order(element);
    newPatient.save();
  });
};

module.exports = {
  validateUsername,
  insertDummyDataPatient,
  insertDummyDataAdmin,
  insertDummyDataPharmacist,
  insertDummyDataOrder,
};
