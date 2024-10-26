const express = require("express");
const router = express.Router();

// import controllers
const {
  createSellingPlace,
  getAllSellingPlaces,
  getSellingPlacesVisible,
  isThereSellingPlaceVisbleAndNotPrivate,
  getSellingPlaceNotPrivate,
  getSellingPlaceById,
  updateSellingPlace,
  deleteSellingPlace,
  getSellingPlacesByDate,
  getSellingPlacesByDateRange,
  getSellingPlacesByDateAndVisible,
  getSellingPlacesByDateRangeAndVisible,
} = require("../controllers/sellingPlace");

// import middlewares
const { verifyToken } = require("../middlewares/auth");

// api routes
router.post("/sellingPlace/create", createSellingPlace);
router.get("/sellingPlaces", getAllSellingPlaces);
router.get("/sellingPlaces/visible", getSellingPlacesVisible);
router.get("/sellingPlaces/isVisible", isThereSellingPlaceVisbleAndNotPrivate);
router.get("/sellingPlaces/notPrivate", getSellingPlaceNotPrivate);
router.get("/sellingPlace/:id", getSellingPlaceById);
router.put("/sellingPlace/update/:id", updateSellingPlace);
router.delete("/sellingPlace/delete/:id", deleteSellingPlace);
router.get("/sellingPlaces/date/:date", getSellingPlacesByDate);
router.get("/sellingPlaces/dateRange/:from/:to", getSellingPlacesByDateRange);
router.get(
  "/sellingPlaces/date/:date/visible",
  getSellingPlacesByDateAndVisible
);
router.get(
  "/sellingPlaces/dateRange/:from/:to/visible",
  getSellingPlacesByDateRangeAndVisible
);

module.exports = router;
