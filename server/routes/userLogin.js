const express = require("express");
const router = express.Router();

// import controllers
const {
  register,
  login,
  logout,
  getLoggedInUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  getUserByRole,
  getUserByFirstname,
  getUserByLastname,
  getUserByFullname,
} = require("../controllers/userLogin");

// import middlewares
const { userRegisterValidator, userById } = require("../middlewares/userLogin");
const { verifyToken } = require("../middlewares/auth");

// api routes
router.post("/register", userRegisterValidator, register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user", verifyToken, getLoggedInUser);
router.put("/user/update", verifyToken, updateUser);
router.delete("/user/delete", verifyToken, deleteUser);
router.get("/users", verifyToken, getAllUsers);
router.get("/user/:id", verifyToken, userById, getUserById);
router.get("/user/username/:username", verifyToken, getUserByUsername);
router.get("/user/email/:email", verifyToken, getUserByEmail);
router.get("/user/role/:role", verifyToken, getUserByRole);
router.get("/user/firstname/:firstname", verifyToken, getUserByFirstname);
router.get("/user/lastname/:lastname", verifyToken, getUserByLastname);
router.get("/user/fullname/:fullname", verifyToken, getUserByFullname);

module.exports = router;
