const express = require("express");
const router = express.Router();

// import controllers
const {
  createVitrail,
  getAllVitrails,
  getVitrailById,
  getVitrailByTitle,
  getVitrailByCategory,
  updateVitrail,
  deleteVitrail,
} = require("../controllers/vitrail");

// import middlewares
const { verifyToken } = require("../middlewares/auth");

// api routes
router.post("/vitrail/create", createVitrail);
router.get("/vitrails", getAllVitrails);
router.get("/vitrail/:id", getVitrailById);
router.get("/vitrail/title/:title", getVitrailByTitle);
router.get("/vitrail/category/:category", getVitrailByCategory);
router.put("/vitrail/update/:id", verifyToken, updateVitrail);
router.delete("/vitrail/delete/:id", verifyToken, deleteVitrail);

module.exports = router;
