const express = require("express");
const router = express.Router();

// import controllers
const {
  createCategory,
  getAllCategories,
  getCategoriesVisibleAndWithCountNotZero,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

// import middlewares
const { verifyToken } = require("../middlewares/auth");

// api routes
router.post("/category/create", verifyToken, createCategory);
router.get("/categories", getAllCategories);
router.get("/categories/visible", getCategoriesVisibleAndWithCountNotZero);
router.put("/category/update/:id", verifyToken, updateCategory);
router.delete("/category/delete/:id", verifyToken, deleteCategory);
router.get("/category/:id", getCategoryById);

module.exports = router;
