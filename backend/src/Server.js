// External variables
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

//imports
const {
  getAdmins,
  deleteAdmin,
  createAdmin,
} = require("./Controllers/adminstratorController");
const {
  createPatient,
  deletePatient,
  updatePatientInfo,
  getPatients,
} = require("./Controllers/patientController");

const {
  getMedicines,
  getMedicine,
  getMedicineSale,
  searchMedicine,
  filterMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  medicineNamesIds,
} = require("./Controllers/medicineController");

const {
  registerPharmacist,
  getPharmacists,
  getPharmacist,
  getInactivePharmacists,
  updatePharmacist,
  deletePharmacist,
} = require("./Controllers/pharmacistController");

const {
  MedicinalUseArray,
  getMedicinalUses,
} = require("./Models/MedicinalUse");

//App variables
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: "sonic123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true in a production environment with HTTPS
  })
);
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

//Initialize cart
const cart = [];

//TODO: main request
app.get("/", (req, res) => {
  res.status(200).send("Server is working!");
});

// #Routing to userController here
//lama bagy a test bakteb dool fi postman b3d el /
//ba map kol method l http req
app.get("/admins", getAdmins);
app.get("/patients", getPatients);
app.get("/medicines", getMedicines);
app.get("/medicine", getMedicine);
app.get("/medicineByName", searchMedicine);
app.get("/medicineNames", medicineNamesIds);
app.get("/medicineSales/:pharmacistId", getMedicineSale);
app.get("/medicinalUses", getMedicinalUses);
app.get("/pharmacists", getPharmacists);
app.get("/pharmacist", getPharmacist);
app.get("/pharmacistApplications", getInactivePharmacists);

app.post("/newPatient", createPatient);
app.post("/newAdmin", createAdmin);
app.post("/newPharmacist", registerPharmacist);
app.post("/newMedicine", createMedicine);
app.post("/filterMedicine", filterMedicine);

app.put("/updatePatient", updatePatientInfo);
app.put("/updateMedicine", updateMedicine);
app.put("/updatePharmacist", updatePharmacist);

app.delete("/deleteAdmin", deleteAdmin);
app.delete("/deletePatient", deletePatient);
app.delete("/deleteMedicine", deleteMedicine);
app.delete("/deletePharmacist", deletePharmacist);

//NEW ROUTES
// CART ROUTES
const cartController = require("./Controllers/cartController");
app.post("/add-to-cart/:medicineId", cartController.addToCart);
app.get("/cart", cartController.viewCart);
app.get("/allCarts", cartController.getAllCarts);
app.post("/clear-cart", cartController.clearCart);
app.post("/change-quantity/:medicineId", cartController.changeQuantity);
app.post(("/remove-from-cart/:medicineId", cartController.removeFromCart));

// ORDER ROUTES
const orderController = require("./Controllers/orderController");
app.post("/checkout", orderController.checkout);
app.get("/allOrders", orderController.getAllOrders);
app.get("/orders/:orderId", orderController.getOrderById);
app.get("/orders/:patientId", orderController.getPatientOrders);
app.post("/orders/:orderId", orderController.updateOrderByID);
app.post("/orders/:orderId", orderController.cancelOrderByID);
app.delete("/orders/:orderId", orderController.deleteOrderByID);

/*
//inserting dummy data
// const dummyData = require("./dummyData/patient");
const Patient = require("./Models/Patient");

const dummyData = require("./dummyData/cart");
const Cart = require("./Models/Cart");

const { insertDummyData } = require("./utils.js");
insertDummyData(dummyData, Cart);
*/
