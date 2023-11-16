const mongoose = require("mongoose");

const IssuesSchema = new mongoose.Schema({
  articleName:{
    type: String,
    required:true
  },
  date: {
    type: Date,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
  to: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = Issues = mongoose.model("issues", IssuesSchema);
