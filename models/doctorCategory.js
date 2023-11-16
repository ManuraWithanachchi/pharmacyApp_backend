const mongoose = require("mongoose");

const DoctorCategorySchema = new mongoose.Schema({
  doctorCategory: {
    type: String,
    required: true,
  },
});

module.exports = doctorCategory = mongoose.model(
  "doctorCategory",
  DoctorCategorySchema
);
