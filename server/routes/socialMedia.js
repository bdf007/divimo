const express = require("express");
const router = express.Router();

// import controllers
const {
  createSocialMedia,
  getAllSocialMedias,
  updateSocialMedia,
  deleteSocialMedia,
} = require("../controllers/socialMedia");

// import middlewares
const { verifyToken } = require("../middlewares/auth");

// api routes
router.post("/socialMedia/create", createSocialMedia);
router.get("/socialMedias", getAllSocialMedias);
router.put("/socialMedia/update/:id", updateSocialMedia);
router.delete("/socialMedia/delete/:id", verifyToken, deleteSocialMedia);

module.exports = router;
