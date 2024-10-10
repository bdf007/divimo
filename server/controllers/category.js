const Category = require("../models/category");
const Vitrail = require("../models/vitrail");

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ error: "Categories not found" });
    }
    // get the number of vitraux for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Vitrail.find({
          category: category.name,
        }).countDocuments();
        return { ...category._doc, count };
      })
    );
    res.status(200).json(categoriesWithCount);

    // res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getCategoriesVisibleAndWithCountNotZero = async (req, res) => {
  try {
    const categories = await Category.find({ visible: true });
    if (!categories) {
      return res.status(404).json({ error: "Categories not found" });
    }
    // get the number of vitraux for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Vitrail.find({
          category: category.name,
        }).countDocuments();
        return { ...category._doc, count };
      })
    );
    // and return only the categories with count > 0 and visible = true
    res
      .status(200)
      .json(categoriesWithCount.filter((category) => category.count > 0));
    // res.status(200).json(categoriesWithCount);
    // res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    // Récupérer la catégorie avant la mise à jour pour obtenir l'ancien nom
    const oldCategory = await Category.findById(req.params.id);
    if (!oldCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Mettre à jour la catégorie
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found after update" });
    }

    // Mettre à jour les vitraux avec le nouveau nom de catégorie
    await Vitrail.updateMany(
      { category: oldCategory.name }, // Trouver les vitraux ayant l'ancien nom de catégorie
      { $set: { category: category.name } } // Mettre à jour avec le nouveau nom
    );

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    // verifier si la catégorie est utilisée par un vitrail
    const vitrail = await Vitrail.findOne({ category: category.name });
    if (vitrail) {
      return res.status(400).json({ error: "Category is used by a vitrail" });
    }

    res.status(204).json(category);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
