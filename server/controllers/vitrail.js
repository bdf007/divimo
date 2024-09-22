const Vitrail = require("../models/vitrail");

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
    const vitrails = await Vitrail.find({ category: req.params.category });
    if (!vitrails) {
      return res.status(404).json({ error: "Vitrails not found" });
    }
    res.status(200).json(vitrails);
  } catch (err) {
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
