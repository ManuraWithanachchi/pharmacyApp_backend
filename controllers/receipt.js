const { validationResult } = require("express-validator");
const Receipt = require("../models/receipt");
const Stock  = require("../models/stock")
const stockController = require("../controllers/stock")

exports.createReceipt = async (req, res) => {
  const errors = validationResult(req);
  console.log("New receipt create");

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const receipt = new Receipt({
    articleName : req.body.articleName,
    date: req.body.date,
    expireDate: req.body.expireDate,
    from: req.body.from,
    quantity: req.body.quantity
  });
  
  const stock = new Stock({
    articleName : req.body.articleName,
    expireDate : req.body.expireDate,
    totalQuantity: req.body.quantity,
    availableQuantity : req.body.quantity
  })

  try {
    const savedReceipt = await receipt.save();
    const savedStock = await stock.save();
    res.json(savedReceipt);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getReceipts= async(req, res) => {
  try {
    const receipts = await Receipt.find();
    res.send(receipts);
  } catch (err) {
    res.json({ message: err });
  }
}

//Get Clinic By Id
exports.getReceiptsByArticleName = async (req, res) => {
  try {
    console.log(req.body.articleName);
    const receipts = await Receipt.find({articleName:req.body.articleName})
    res.json(receipts);
  } catch (err) {
    res.json({ message: err });
  }
};