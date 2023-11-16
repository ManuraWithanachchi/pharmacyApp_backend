const { validationResult } = require("express-validator");
const Issue = require("../models/issue");
const Stock = require("../models/stock")

exports.createIssue = async (req, res) => {
  const errors = validationResult(req);
  console.log("New Issue create");

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const issue = new Issue({
    articleName: req.body.articleName,
    date: req.body.date,
    expireDate: req.body.expireDate,
    to: req.body.to,
    quantity: req.body.quantity,
  });

  try {
    // Step 1: Find the relevant stock based on expireDate
    const stock = await Stock.findOne({ articleName: req.body.articleName,expireDate: req.body.expireDate });

    if (!stock) {
      return res.status(404).json({ message: "Related stock not found" });
    }

    // Step 2: Subtract quantity from available quantity in stock
    if (stock.availableQuantity >= req.body.quantity) {
      stock.availableQuantity -= req.body.quantity;

      // Step 3: Update the stock with the new available quantity
      await stock.save();

      // Step 4: Create the new issue
      const savedIssue = await issue.save();
      res.json(savedIssue);
    } else {
      return res.status(400).json({ message: "Not enough stock available" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};


exports.getIssues= async(req, res) => {
  try {
    const issues = await Issue.find();
    res.send(issues);
  } catch (err) {
    res.json({ message: err });
  }
}

//Get Clinic By Id
exports.getIssuesByArticleName = async (req, res) => {
  try {
    console.log(req.body.articleName);
    const issues = await Issue.find({articleName:req.body.articleName})
    res.json(issues);
  } catch (err) {
    res.json({ message: err });
  }
};