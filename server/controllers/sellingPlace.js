const SellingPlace = require("../models/sellingPlace");

exports.createSellingPlace = async (req, res) => {
  try {
    const sellingPlace = new SellingPlace(req.body);
    await sellingPlace.save();
    res.status(201).json(sellingPlace);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllSellingPlaces = async (req, res) => {
  try {
    const sellingPlaces = await SellingPlace.find();
    if (!sellingPlaces) {
      return res.status(404).json({ error: "Selling places not found" });
    }
    res.status(200).json(sellingPlaces);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSellingPlacesVisible = async (req, res) => {
  try {
    const sellingPlaces = await SellingPlace.find({ visible: true });
    if (!sellingPlaces) {
      return res.status(404).json({ error: "Selling places not found" });
    }
    res.status(200).json(sellingPlaces);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.isThereSellingPlaceVisbleAndNotPrivate = async (req, res) => {
  try {
    const sellingPlaces = await SellingPlace.find({
      privateCalendar: false,
      visible: true,
    });
    if (!sellingPlaces) {
      return res.status(404).json({ error: "Selling places not found" });
    }
    res.status(200).json(sellingPlaces.length > 0);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSellingPlaceById = async (req, res) => {
  try {
    const sellingPlace = await SellingPlace.findById(req.params.id);
    if (!sellingPlace) {
      return res.status(404).json({ error: "Selling place not found" });
    }
    res.status(200).json(sellingPlace);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSellingPlaceNotPrivate = async (req, res) => {
  try {
    const sellingPlaces = await SellingPlace.find({ privateCalendar: false });
    if (!sellingPlaces) {
      return res.status(404).json({ error: "Selling places not found" });
    }
    res.status(200).json(sellingPlaces);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateSellingPlace = async (req, res) => {
  try {
    const sellingPlace = await SellingPlace.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!sellingPlace) {
      return res.status(404).json({ error: "Selling place not found" });
    }
    res.status(200).json(sellingPlace);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteSellingPlace = async (req, res) => {
  try {
    const sellingPlace = await SellingPlace.findByIdAndDelete(req.params.id);
    if (!sellingPlace) {
      return res.status(404).json({ error: "Selling place not found" });
    }
    res.status(200).json(sellingPlace);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSellingPlacesByDate = async (req, res) => {
  try {
    const sellingPlaces = await SellingPlace.find({
      DateFrom: { $gte: req.params.date },
      DateTo: { $lte: req.params.date },
    });
    if (!sellingPlaces) {
      return res.status(404).json({ error: "Selling places not found" });
    }
    res.status(200).json(sellingPlaces);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSellingPlacesByDateRange = async (req, res) => {
  try {
    const sellingPlaces = await SellingPlace.find({
      DateFrom: { $gte: req.params.dateFrom },
      DateTo: { $lte: req.params.dateTo },
    });
    if (!sellingPlaces) {
      return res.status(404).json({ error: "Selling places not found" });
    }
    res.status(200).json(sellingPlaces);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSellingPlacesByDateAndVisible = async (req, res) => {
  try {
    const sellingPlaces = await SellingPlace.find({
      DateFrom: { $gte: req.params.date },
      DateTo: { $lte: req.params.date },
      visible: true,
    });
    if (!sellingPlaces) {
      return res.status(404).json({ error: "Selling places not found" });
    }
    res.status(200).json(sellingPlaces);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSellingPlacesByDateRangeAndVisible = async (req, res) => {
  try {
    const sellingPlaces = await SellingPlace.find({
      DateFrom: { $gte: req.params.dateFrom },
      DateTo: { $lte: req.params.dateTo },
      visible: true,
    });
    if (!sellingPlaces) {
      return res.status(404).json({ error: "Selling places not found" });
    }
    res.status(200).json(sellingPlaces);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
