// External variables
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//imports
const {
  getAdmins,
  deleteAdmin,
  createAdmin,
  adminChangePassword,
} = require("./Controllers/adminstratorController");
const {
  login,
  requireAuth,
  logout,
  updateUserInfoInCookie,
  otp,
  verifyOtp,
  resetPassword,
} = require("./Controllers/authenticationController");
const {
  createPatient,
  deletePatient,
  updatePatientInfo,
  getPatients,
  patientChangePassword,
  createCustomer,
  chargePayment,
  getPatientById,
  getWallet,
  subWalletAmount,
  addWalletAmount,
  getDeliveryAddresses,
  addDeliveryAddress,
  deleteAddress,
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
  pharmacistChangePassword,
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
// Use the cookie-parser middleware
app.use(cookieParser());
const port = process.env.PORT || "8000";

// //Apply middleware to all routes except the login route
// app.use((req, res, next) => {
//   // Check if the route is not the login route
//   if (req.path !== "/login") {
//     // Apply your middleware to all routes except login
//     requireAuth(req, res, next);
//   } else {
//     // If it's the login route, skip the middleware
//     next();
//   }
// });

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
  res.status(200).send("Server is working!");
});

// #Routing to userController here
//lama bagy a test bakteb dool fi postman b3d el /
//ba map kol method l http req
app.get("/admins", getAdmins);
app.get("/patients", getPatients);
app.get("/patientById/:patientId", getPatientById);
app.get("/patientAddresses", getDeliveryAddresses);
app.get("/medicines", getMedicines);
app.get("/medicine", getMedicine);
app.get("/medicineByName", searchMedicine);
app.get("/medicineNames", medicineNamesIds);
app.get("/medicineSales/:pharmacistId", getMedicineSale);
app.get("/medicinalUses", getMedicinalUses);
app.get("/pharmacists", getPharmacists);
app.get("/pharmacist", getPharmacist);
app.get("/pharmacistApplications", getInactivePharmacists);
app.get("/wallet/:userId?", getWallet);

app.post("/newPatient", createPatient);
app.post("/newAdmin", createAdmin);
app.post("/newPharmacist", registerPharmacist);
app.post("/newMedicine", createMedicine);
app.post("/filterMedicine", filterMedicine);
app.post("/addAddress", addDeliveryAddress);

//authentication
app.post("/login", login);
app.post("/requireAuth");
app.post("/logout", logout);
app.put("/updCookie", updateUserInfoInCookie);
app.post("/otp", otp);
app.post("/verifyOtp", verifyOtp);

app.put("/updatePatient", requireAuth, updatePatientInfo);
app.put("/updateMedicine", requireAuth, updateMedicine);
app.put("/updatePharmacist", requireAuth, updatePharmacist);
app.put("/patientChangePassword", patientChangePassword);
app.put("/adminChangePassword/:userId?", adminChangePassword);
app.put("/pharmacistChangePassword/:userId?", pharmacistChangePassword);
app.put("/resetPassword", resetPassword);
app.put("/addWalletAmount/:userId?", addWalletAmount);
app.put("/subWalletAmount/:userId?", subWalletAmount);

app.delete("/deleteAdmin", requireAuth, deleteAdmin);
app.delete("/deletePatient", requireAuth, deletePatient);
app.delete("/deleteMedicine", requireAuth, deleteMedicine);
app.delete("/deletePharmacist", requireAuth, deletePharmacist);
app.delete("/deleteAddress", requireAuth, deleteAddress);

//NEW ROUTES
// CART ROUTES
const cartController = require("./Controllers/cartController");
app.get("/cart/:userId?", cartController.viewCart);
app.get("/allCarts", cartController.getAllCarts);
app.put("/addtocart/:medicineId/:userId?", cartController.addToCart);
app.post("/changequantity/:medicineId/:userId?", cartController.changeQuantity);
app.post("/removefromcart/:medicineId/:userId?", cartController.removeFromCart);
app.put("/clearcart/:userId?", cartController.clearCart);

// ORDER ROUTES
const orderController = require("./Controllers/orderController");
app.get("/allOrders", orderController.getAllOrders);
app.get("/patientorders/:userId?", orderController.getPatientOrders);
app.get("/orders/:orderId", orderController.getOrderById);
app.post("/checkout", orderController.checkout);
app.put("/orders/update/:orderId", orderController.updateOrderByID);
app.put(
  "/orders/updatebynumber/:orderNumber/:userId?",
  orderController.updateOrderByNumber
);
app.put("/cancelorder/:orderId", orderController.cancelOrderByID);
app.put(
  "/cancelorderbynumber/:orderNumber/:userId?",
  orderController.cancelOrderByNumber
);
app.delete("/deleteorder/:orderId", orderController.deleteOrderByID);
app.delete(
  "/deleteorderbynumber/:orderNumber/:userId?",
  orderController.deleteOrderByNumber
);

//DUMMY DATA

// const dummyData = require("./dummyData/order");
// const Patient = require("./Models/Adminstrator");
// const {
//   insertDummyDataPatient,
//   insertDummyDataAdmin,
//   insertDummyDataPharmacist,
//   insertDummyDataOrder,
// } = require("./utils");

//insertDummyDataPatient(dummyData);
//insertDummyDataAdmin(dummyData);
//insertDummyDataPharmacist(dummyData);
//insertDummyDataOrder(dummyData);
