// External variables
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
mongoose.set("strictQuery", false);
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

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
  getDeliveryAddresses,
  addDeliveryAddress,
  deleteAddress,
  getWallet,
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
  getAlternativeMedicines,
  getTotalMonthSales,
  getFilteredSalesReport,
  getAllMedicines,
  getArchivedMedicines,
  unarchiveMedicine,
} = require("./Controllers/medicineController");

const {
  registerPharmacist,
  getPharmacists,
  getPharmacist,
  getInactivePharmacists,
  updatePharmacist,
  deletePharmacist,
  pharmacistChangePassword,
  getPharmacistWallet,
} = require("./Controllers/pharmacistController");

const pharmacistController = require("./Controllers/pharmacistController");

const {
  MedicinalUseArray,
  getMedicinalUses,
} = require("./Models/MedicinalUse");

const {
  sendPatientMessage,
  patientChat,
} = require("./Controllers/chatController");

//App variables
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: "sonic123",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true in a production environment with HTTPS
  })
);
// Use the cookie-parser middleware
app.use(cookieParser());
const port = process.env.PORT || "8000";

// //Apply middleware to all routes except the login route
// // app.use((req, res, next) => {
// //   // Check if the route is not the login route
// //   if (
//     req.path !== "/login" && req.path !== "/otp"
//     // req.path !== "/patient-signup" ||
//     // req.path !== "/pharmacist-signup"
//   ) {
// //     // Apply your middleware to all routes except login
// //     requireAuth(req, res, next);
// //   } else {
// //     // If it's the login route, skip the middleware
// //     next();
// //   }
// // });

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
app.get("/admins", requireAuth, getAdmins);
app.get("/patients", requireAuth, getPatients);
app.get("/patientById/:patientId", getPatientById);
app.get("/patientAddresses", requireAuth, getDeliveryAddresses);
app.get("/medicines", requireAuth, getMedicines);
app.get("/medicine", requireAuth, getMedicine);
app.get("/medicineByName", requireAuth, searchMedicine);
app.get("/medicineNames", requireAuth, medicineNamesIds);
app.get("/medicineSales", requireAuth, getMedicineSale);
app.get("/medicinalUses", requireAuth, getMedicinalUses);
app.get("/pharmacists", requireAuth, getPharmacists);
app.get("/pharmacist", requireAuth, getPharmacist);
app.get("/pharmacistApplications", requireAuth, getInactivePharmacists);
app.get("/getAlternativeMedicines", getAlternativeMedicines);
app.get("/getPatientWallet", getWallet);
app.get("/getPharmacistWallet", getPharmacistWallet);
app.get("/monthlySales", getTotalMonthSales);
app.get("/filteredSales", getFilteredSalesReport);
app.get("/allMedicines", getAllMedicines);
app.get("/archivedMedicines", getArchivedMedicines);
app.get("/patientChat", requireAuth, patientChat);

app.post("/newPatient", createPatient);
app.post("/newAdmin", requireAuth, createAdmin);
// app.post("/newPharmacist", registerPharmacist );
app.post(
  "/newPharmacist",
  pharmacistController.upload.array("files", 5),
  registerPharmacist
);
app.post("/newMedicine", requireAuth, createMedicine);
app.post("/filterMedicine", filterMedicine);
app.post("/addAddress", addDeliveryAddress);

//authentication
app.post("/login", login);
// app.post("/requireAuth");
app.post("/logout", logout);
app.put("/updCookie", updateUserInfoInCookie);
app.post("/otp", otp);
app.post("/verifyOtp", verifyOtp);
app.post("/sendPatientChatMessage", sendPatientMessage);

app.put("/updatePatient", requireAuth, updatePatientInfo);
app.put("/updateMedicine", requireAuth, updateMedicine);
app.put("/updatePharmacist", requireAuth, updatePharmacist);
app.put("/patientChangePassword", patientChangePassword);
app.put("/adminChangePassword/:userId?", adminChangePassword);
app.put("/pharmacistChangePassword/:userId?", pharmacistChangePassword);
app.put("/resetPassword", resetPassword);
app.put("/deleteMedicine", requireAuth, deleteMedicine);
app.put("/unarchiveMedicine", unarchiveMedicine);

app.delete("/deleteAdmin", requireAuth, deleteAdmin);
app.delete("/deletePatient", requireAuth, deletePatient);

app.delete("/deletePharmacist", requireAuth, deletePharmacist);
app.delete("/deleteAddress", requireAuth, deleteAddress);

//NEW ROUTES
// CART ROUTES
const cartController = require("./Controllers/cartController");
app.get("/cart/:userId?", requireAuth, cartController.viewCart);
app.get("/allCarts", requireAuth, cartController.getAllCarts);
app.put(
  "/addtocart/:medicineId/:userId?",
  requireAuth,
  cartController.addToCart
);
app.post(
  "/changequantity/:medicineId/:userId?",
  requireAuth,
  cartController.changeQuantity
);
app.post(
  "/removefromcart/:medicineId/:userId?",
  requireAuth,
  cartController.removeFromCart
);
app.put("/clearcart/:userId?", requireAuth, cartController.clearCart);

// ORDER ROUTES
const orderController = require("./Controllers/orderController");
app.get("/allOrders", orderController.getAllOrders);
app.get(
  "/patientorders/:userId?",
  requireAuth,
  orderController.getPatientOrders
);
app.get("/orders/:orderId", requireAuth, orderController.getOrderById);
app.post("/checkoutCash", requireAuth, orderController.checkout);
app.post("/checkoutWallet", requireAuth, orderController.checkoutWallet);
app.put(
  "/orders/update/:orderId",
  requireAuth,
  orderController.updateOrderByID
);
app.put(
  "/orders/updatebynumber/:orderNumber/:userId?",
  requireAuth,
  orderController.updateOrderByNumber
);
app.put("/cancelorder/:orderId", requireAuth, orderController.cancelOrderByID);
app.put(
  "/cancelorderbynumber/:orderNumber/:userId?",
  requireAuth,
  orderController.cancelOrderByNumber
);
app.delete(
  "/deleteorder/:orderId",
  requireAuth,
  orderController.deleteOrderByID
);
app.delete(
  "/deleteorderbynumber/:orderNumber/:userId?",
  orderController.deleteOrderByNumber
);

app.post("/checkoutStripe", requireAuth, orderController.checkoutStripe);

//DUMMY DATA

// const dummyData = require("./dummyData/medicine");
// // const Patient = require("./Models/Adminstrator");
// const {
//   insertDummyDataPatient,
//   insertDummyDataAdmin,
//   insertDummyDataPharmacist,
//   insertDummyDataOrder,
//   insertDummyDataMedicine,
// } = require("./utils");

//insertDummyDataMedicine(dummyData);
// insertDummyDataPatient(dummyData);
//insertDummyDataAdmin(dummyData);
//insertDummyDataPharmacist(dummyData);
//insertDummyDataOrder(dummyData);
