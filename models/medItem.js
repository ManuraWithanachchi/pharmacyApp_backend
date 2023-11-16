const mongoose = require("mongoose");

const medItemSchema = new mongoose.Schema({
  articleName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "-"
  }
});

module.exports = MedItem = mongoose.model("med_Item", medItemSchema);
