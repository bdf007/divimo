const mongoose = require("mongoose");

const sellingPlaceSchema = new mongoose.Schema(
  {
    name: {
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
    visible: {
      type: Boolean,
      default: false,
    },
    activeSellingPlace: {
      type: Boolean,
      default: false,
    },
    dateFrom: {
      type: Date,
    },
    dateTo: {
      type: Date,
    },
    color: {
      type: String,
    },
    privateCalendar: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SellingPlace", sellingPlaceSchema);
