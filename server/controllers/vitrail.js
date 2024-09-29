const Vitrail = require("../models/vitrail");
const Category = require("../models/category");

exports.createVitrail = async (req, res) => {
  try {
    const vitrail = new Vitrail(req.body);
    await vitrail.save();
    res.status(201).json(vitrail);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllVitrails = async (req, res) => {
  try {
    const vitrails = await Vitrail.find();
    if (!vitrails) {
      return res.status(404).json({ error: "Vitrails not found" });
    }
    // // get the name of the category and replace the category id
    // for (let i = 0; i < vitrails.length; i++) {
    //   const vitrail = vitrails[i];
    //   const category = await Category.findById(vitrail.category);
    //   vitrail.category = category.name;
    // }
    res.status(200).json(vitrails);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getVitrailById = async (req, res) => {
  try {
    const vitrail = await Vitrail.findById(req.params.id);
    if (!vitrail) {
      return res.status(404).json({ error: "Vitrail not found" });
    }
    res.status(200).json(vitrail);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getVitrailByTitle = async (req, res) => {
  try {
    const vitrail = await Vitrail.findOne({ title: req.params.title });
    if (!vitrail) {
      return res.status(404).json({ error: "Vitrail not found" });
    }
    res.status(200).json(vitrail);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getVitrailByCategory = async (req, res) => {
  try {
    const categoryName = req.query.category;
    const visible = req.query.visible;

    // Récupérer la catégorie pour obtenir la description
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Rechercher les vitraux correspondants à la catégorie et à la visibilité
    const vitrails = await Vitrail.find({
      category: categoryName,
      visible: true,
    });
    if (!vitrails || vitrails.length === 0) {
      return res.status(404).json({ error: "Vitrails not found" });
    }

    // Ajouter la description de la catégorie à chaque vitrail
    const vitrailsWithCategoryDescription = vitrails.map((vitrail) => ({
      ...vitrail.toObject(), // Convertir en objet JavaScript
      categoryDescription: category.description, // Ajouter la description de la catégorie
    }));

    res.status(200).json(vitrailsWithCategoryDescription);
  } catch (err) {
    console.error("Error fetching vitrails by category:", err); // Log de l'erreur
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getVitrailCarousel = async (req, res) => {
  try {
    const vitrails = await Vitrail.find({ carousel: true });
    if (!vitrails) {
      return res.status(404).json({ error: "Vitrails not found" });
    }
    res.status(200).json(vitrails);
  } catch (err) {
    console.error("Error fetching vitrails for carousel: ", err); // Log l'erreur côté serveur
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getVitrailCarouselRandom = async (req, res) => {
  // récuperer 5 vitraux aléatoires pour le carousel ayant la propiete carousel : true
  try {
    const vitrails = await Vitrail.aggregate([
      { $match: { carousel: true } },
      { $sample: { size: 5 } },
    ]);
    if (!vitrails) {
      return res.status(404).json({ error: "Vitrails not found" });
    }
    res.status(200).json(vitrails);
  } catch (err) {
    console.error("Error fetching vitrails for carousel: ", err); // Log l'erreur côté serveur
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateVitrail = async (req, res) => {
  try {
    const id = req.params.id;
    const vitrailToUpdate = await Vitrail.findById(id);
    if (!vitrailToUpdate) {
      return res.status(404).json({ error: "Vitrail not found" });
    }
    const updatedVitrail = await Vitrail.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "vitrail updated successfully",
      updatedVitrail: updatedVitrail,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteVitrail = async (req, res) => {
  try {
    const vitrail = await Vitrail.findByIdAndDelete(req.params.id);
    if (!vitrail) {
      return res.status(404).json({ error: "Vitrail not found" });
    }
    res.status(200).json({ message: "Vitrail deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
