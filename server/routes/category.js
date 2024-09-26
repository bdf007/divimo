const express = require("express");
const router = express.Router();

// import controllers
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

// import middlewares
const { verifyToken } = require("../middlewares/auth");

// api routes
router.post("/category/create", createCategory);
router.get("/categories", getAllCategories);
router.put("/category/update/:id", updateCategory);
router.delete("/category/delete/:id", deleteCategory);
router.get("/category/:id", getCategoryById);

module.exports = router;
