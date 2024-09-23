const About = require("../models/about");

exports.createAbout = async (req, res) => {
  try {
    const about = new About(req.body);
    await about.save();
    // if activeAbout is true, update all other abouts to false
    if (about.activeAbout) {
      await About.updateMany(
        { _id: { $ne: about._id } },
        { $set: { activeAbout: false } }
      );
    }
    res.status(201).json(about);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllAbouts = async (req, res) => {
  try {
    const abouts = await About.find();
    if (!abouts) {
      return res.status(404).json({ error: "Abouts not found" });
    }
    res.status(200).json(abouts);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAboutById = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) {
      return res.status(404).json({ error: "About not found" });
    }
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAboutActive = async (req, res) => {
  try {
    const about = await About.findOne({ activeAbout: true });
    if (!about) {
      return res.status(404).json({ error: "Active about not found" });
    }
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const about = await About.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // if activeAbout is true, update all other abouts to false
    if (about.activeAbout) {
      await About.updateMany(
        { _id: { $ne: about._id } },
        { $set: { activeAbout: false } }
      );
    }
    res.status(200).json({ message: "About updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    await About.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "About deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};