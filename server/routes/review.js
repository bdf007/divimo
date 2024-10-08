const express = require("express");
const router = express.Router();

// import controllers
const {
  getReview,
  getReviewVisibleAndValidated,
  getReviewRandom,
  getReviewByEmail,
  postReview,
  getReviewById,
  updateReviewById,
  validateReviewById,
  modifyVisbilityById,

  deleteReviewById,
} = require("../controllers/review");

// import middlewares

// api routes
// get review page
router.get("/review", getReview);

// post review page
router.post("/review", postReview);

// get review page with visible and validated reviews
router.get("/review/visible", getReviewVisibleAndValidated);

// get 5 random reviews visble and validated for the home page
router.get("/review/random", getReviewRandom);

// get review by email of the user
router.get("/review/email/:email", getReviewByEmail);

// update specific review by id
router.put("/review/update/:id", updateReviewById);

// validation specific review by id
router.put("/review/validation/:id", validateReviewById);

// modify visibility of specific review by id
router.put("/review/visibility/:id", modifyVisbilityById);

// get specific review by id
router.get("/review/:id", getReviewById);

// delete specific review by id
router.delete("/review/:id", deleteReviewById);

module.exports = router;
