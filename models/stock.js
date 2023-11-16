const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  articleName:{
    type: String,
    required:true
  },
  expireDate: {
    type: Date,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true
  },
  availableQuantity: {
    type: Number,
    required: true
  }
});

module.exports = Stock = mongoose.model("stock", StockSchema);
