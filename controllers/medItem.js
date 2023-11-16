const { validationResult } = require("express-validator");
const MedItem = require("../models/medItem");

//Create new MedItem
exports.createMedItem = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const medItem = new MedItem({
    articleName: req.body.articleName,
    category: req.body.category,
    description: req.body.description,
  });

  try {
    await medItem.save();
    res.send("New Medicine Item Added Successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};

//Get All MedItems
exports.getAllMedItems = async (req, res) => {
  try {
    const medItems = await MedItem.find();
    res.send(medItems);
  } catch (err) {
    res.json({ message: err });
  }
};

//Get medItem By Id
exports.getMedItemById = async (req, res) => {
  try {
    const medItem = await MedItem.findById(req.params.medItemId);
    res.json(medItem);
  } catch (err) {
    res.json({ message: err });
  }
};

//Delete MedItem By Id
exports.deleteMedItem = async (req, res) => {
  try {
    const removedMedItem = await MedItem.deleteOne({ _id: req.params.medItemId });
    res.send("MedItem was deleted Successfully.");
  } catch (err) {
    res.json({ message: err });
  }
};

//Update MedItem By Id
exports.updateMedItem = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updateMedItem = {
    articleName: req.body.articleName,
    category: req.body.category,
    description: req.body.description,
  };

  try {
    await MedItem.updateOne({ _id: req.params.medItemcId }, updateMedItem);
    res.send("Medicine Item was Updated successfully.");
  } catch (err) {
    res.status(400).send(err);
  }
};
