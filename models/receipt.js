const mongoose = require("mongoose");

const ReceiptsSchema = new mongoose.Schema({
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
  from: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = Receipts = mongoose.model("receipts", ReceiptsSchema);
