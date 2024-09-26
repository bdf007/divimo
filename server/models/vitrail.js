const mongoose = require("mongoose");

const vitrailSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "Pas de description",
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      trim: true,
      maxlength: 32,
      default: "Non classé",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    photo: {
      type: String,
      required: true,
      trim: true,
    },
    carousel: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    shipping: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vitrail", vitrailSchema);
