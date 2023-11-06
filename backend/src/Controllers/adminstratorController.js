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
  const { id } = req.params;
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

const adminLogin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // Find the admin using their email address
    const user = await admin.findOne({ username });

    // If the admin wasn't found, respond with an error message
    if (!user) {
      res.status(404).json({ message: "Invalid login credentials" });
      return;
    }

    // Check if the password is correct
    const passwordMatches = await user.checkPassword(password);

    // If the password is incorrect, respond with an error message
    if (!passwordMatches) {
      res.status(409).json({ message: "Invalid login credentials" });
      return;
    }

    // If the email and password are correct, create a session cookie to log the user in
    req.session.user = user;
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};

const adminChangePassword = async (req, res) => {
  const user = await admin.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'Admin not found' });
  }

  const { oldPassword, newPassword } = req.body;

  // Check if the old password is correct
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordCorrect) {
    return res.status(409).json({ error: 'Invalid old password' });
  }

  // Hash the new password and update the user's document
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();

  return res.status(200).json({ message: 'Password updated successfully' });
};



module.exports = { getAdmins, deleteAdmin, createAdmin,adminLogin,adminChangePassword };
