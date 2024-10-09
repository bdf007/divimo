const SocialMedia = require("../models/socialMedia");

exports.createSocialMedia = async (req, res) => {
  try {
    const socialMedia = new SocialMedia(req.body);
    await socialMedia.save();
    res.status(201).json(socialMedia);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllSocialMedias = async (req, res) => {
  try {
    const socialMedias = await SocialMedia.find();
    if (!socialMedias) {
      return res.status(404).json({ error: "SocialMedias not found" });
    }
    res.status(200).json(socialMedias);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateSocialMedia = async (req, res) => {
  try {
    const socialMedia = await SocialMedia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!socialMedia) {
      return res.status(404).json({ error: "SocialMedia not found" });
    }
    res.status(200).json(socialMedia);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteSocialMedia = async (req, res) => {
  try {
    const socialMedia = await SocialMedia.findByIdAndDelete(req.params.id);
    if (!socialMedia) {
      return res.status(404).json({ error: "SocialMedia not found" });
    }
    res.status(200).json(socialMedia);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
