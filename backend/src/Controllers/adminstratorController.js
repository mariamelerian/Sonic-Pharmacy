const admin = require("../Models/Adminstrator.js");
const { default: mongoose } = require("mongoose");
const { validateUsername } = require("../utils.js");

const createAdmin = async (req, res) => {
  const { username, password } = req.body;

  const validation = await validateUsername(username);
  // check if username already exists in database
  if (!validation) {
    return res.status(409).json({ message: "Username already exists" });
  }
  // create new admin
  try {
    const newAdmin = await admin.create({ username, password });
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const getAdmins = async (req, res) => {
  const users = await admin.find();
  res.status(200).send(users);
};

const deleteAdmin = async (req, res) => {
  const { id } = req.body;
  // check if admin exists in database
  admin
    .findByIdAndDelete(id)
    .then((deletedUser) => {
      if (deletedUser) {
        console.log("User deleted:", deletedUser);
        res.status(200).json({ message: "Admin deleted successfully" });
      } else {
        return res.status(404).json({ message: "Admin not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    });
};

module.exports = { getAdmins, deleteAdmin, createAdmin };
