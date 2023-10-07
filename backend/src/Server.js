// External variables
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

//imports
const {
  getAdmins,
  changeAdminPassword,
  deleteAdmin,
  createAdmin,
} = require("./Controllers/adminstratorController");
const {
  createPatient,
  deletePatient,
  updatePatientInfo,
  changePatientPassword,
  getPatients,
} = require("./Controllers/patientController");

const {
  getMedicines,
  getMedicine,
  getMedicineByName,
  getMedicineSale,
  searchMedicine,
  filterMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} = require("./Controllers/medicineController");

const {
  registerPharmacist,
  getPharmacists,
  getPharmacist,
  getInactivePharmacists,
  updatePharmacist,
  deletePharmacist,
} = require("./Controllers/pharmacistController");

//App variables
const app = express();
const port = process.env.PORT || "8000";

// Mongo DB
const MongoURI = process.env.MONGO_URI;
mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

//TODO: main request
app.get("/", (req, res) => {
  res.status(200).send("You have everything installed!");
});

// #Routing to userController here
//lama bagy a test bakteb dool fi postman b3d el /
//ba map kol method l http req
app.get("/admins", getAdmins);
app.get("/patients", getPatients);
app.get("/medicines", getMedicines);
app.get("/medicine", getMedicine);
app.get("/medicineByName", getMedicineByName);
app.get("/medicineSales", getMedicineSale);
app.get("/searchMedicine", searchMedicine);
app.get("/filterMedicine", filterMedicine);
app.get("/pharmacists", getPharmacists);
app.get("/pharmacist", getPharmacist);
app.get("/pharmacistApplications", getInactivePharmacists);

app.post("/newPatient", createPatient);
app.post("/newAdmin", createAdmin);
app.post("/newPharmacist", registerPharmacist);
app.post("/newMedicine", createMedicine);

app.put("/changeAdminPassword", changeAdminPassword);
app.put("/changePatientPassword", changePatientPassword);
app.put("/updatePatient", updatePatientInfo);
app.put("/updateMedicine", updateMedicine);
app.put("/updatePharmacist", updatePharmacist);

app.delete("deleteAdmin", deleteAdmin);
app.delete("/deletePatient", deletePatient);
app.delete("/deleteMedicine", deleteMedicine);
app.delete("/deletePharmacist", deletePharmacist);
