const UserLogin = require("../models/userLogin");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  // check if user already exists
  const usernameExists = await UserLogin.findOne({
    username: req.body.username,
  });
  const emailExists = await UserLogin.findOne({ email: req.body.email });

  if (usernameExists) {
    return res.status(403).json({ error: "Username is taken" });
  }
  if (emailExists) {
    return res.status(403).json({ error: "Email is taken" });
  }

  // if new user, create new user
  const user = new UserLogin(req.body);
  await user.save();

  res.status(200).json({ message: "Register success! Please login." });
};

exports.login = async (req, res) => {
  // const { username, password } = req.body;
  // check if user exists
  try {
    const user = await UserLogin.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // authenticate
    if (!user.authenticate(req.body.password)) {
      return res
        .status(401)
        .json({ error: "Username and password do not match" });
    }

    // generate a token and put it in cookies
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("jwt", token, { expire: new Date() + 9999, httpOnly: true });

    // destructure user
    const { _id, username, role } = user;
    return res.json({
      token,
      user: { message: "Login success", _id, username, role },
    });
  } catch (err) {
    console.error("Login error: ", err);
    return res.status(500).json({ error: "Internal server error bis" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.json({ message: "Logout success" });
};

exports.getLoggedInUser = (req, res) => {
  const { username, role } = req.user;
  return res.status(200).json({
    username,
    firstname,
    lastname,
    role,
    message: "User is still logged in",
  });
};

exports.updateUser = async (req, res) => {
  try {
    const user = await UserLogin.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UserLogin.findByIdAndDelete(req.user._id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserLogin.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserById = (req, res) => {
  const { username, role } = req.user;
  return res.status(200).json({
    username,
    firstname,
    lastname,
    role,
    message: "User found",
  });
};

exports.getUserByUsername = async (req, res) => {
  try {
    const user = await UserLogin.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User;
    Login.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserByRole = async (req, res) => {
  try {
    const users = await UserLogin.find({ role: req.params.role });
    if (!users) {
      return res.status(404).json({ error: "Users not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserByFirstname = async (req, res) => {
  try {
    const user = await UserLogin.findOne({ firstname: req.params.firstname });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserByLastname = async (req, res) => {
  try {
    const user = await UserLogin.findOne({ lastname: req.params.lastname });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserByFullname = async (req, res) => {
  try {
    const user = await UserLogin.findOne({
      firstname: req.params.firstname,
      lastname: req.params.lastname,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};