const express = require("express");
const router = express.Router();

// import controllers
const {
  createVitrail,
  getAllVitrails,
  getVitrailById,
  getVitrailByTitle,
  getVitrailByCategory,
  getVitrailCarousel,
  getVitrailCarouselRandom,
  updateVitrail,
  deleteVitrail,
} = require("../controllers/vitrail");

// import middlewares
const { verifyToken } = require("../middlewares/auth");

// api routes
router.post("/vitrail/create", verifyToken, createVitrail);
router.get("/vitrails", getAllVitrails);
router.get("/vitrail/carousel", getVitrailCarousel);
router.get("/vitrail/carouselRandom", getVitrailCarouselRandom);
router.put("/vitrail/update/:id", verifyToken, updateVitrail);
router.get("/vitrail/title/:title", getVitrailByTitle);
router.get("/vitrail/category", getVitrailByCategory);
router.delete("/vitrail/delete/:id", deleteVitrail);
router.get("/vitrail/:id", getVitrailById);

module.exports = router;
