const { validationResult } = require("express-validator");
const Stock = require("../models/stock");

exports.createStock = async (req, res) => {
  const errors = validationResult(req);
  console.log("New stock create");

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const stock = new Stock({
    articleName : req.body.articleName,
    expireDate: req.body.expireDate,
    totalQuantity: req.body.totalQuantity,
    availableQuantity: req.body.availableQuantity
  });
  try {
    const savedStock = await stock.save();
    res.json(savedStock);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getStocks= async(req, res) => {
  try {
    const stocks = await Stock.find();
    res.send(stocks);
  } catch (err) {
    res.json({ message: err });
  }
}

//Get Stock By Article Name
exports.getStocksByArticleName = async (req, res) => {
  try {
    console.log(req.body.articleName);
    const stocks = await Stock.find({articleName:req.body.articleName})
    res.json(stocks);
  } catch (err) {
    res.json({ message: err });
  }
};

//Get Stock By Expire date
exports.getStocksByExpireDateAndArticleName = async (req, res) => {
  try {
    const expireDate = req.query.expireDate; // Retrieve expireDate from query parameter
    const articleName = req.query.articleName; // Retrieve articleName from query parameter
    const query = {
      expireDate: expireDate,
      articleName: articleName,
    };

    const stocks = await Stock.find(query);
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getStocksWithin30Days = async (req, res) => {
  try {
    // Calculate the current date
    const currentDate = new Date();

    // Calculate the date 30 days from now
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    // Find stocks with expiry dates within the next 30 days
    const stocks = await Stock.find({
      expireDate: {
        $gte: currentDate, // Greater than or equal to the current date
        $lte: thirtyDaysFromNow, // Less than or equal to 30 days from now
      },
    });

    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
