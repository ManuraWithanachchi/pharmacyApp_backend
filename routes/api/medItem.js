const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const MedItemController = require("../../controllers/medItem");

//Create new medItem
router.post(
  "/",
  [
    body("articleName", "Article name is Required.").not().isEmpty(),
    body("category","Category of medicine item is Required.").not().isEmpty()
  ],
  MedItemController.createMedItem
);

//Get all MedItems
router.get("/", MedItemController.getAllMedItems);

//Find medItem By Id
router.get("/:medItemId", MedItemController.getMedItemById);

//Delete medItem by Id
router.delete("/:medItemId", MedItemController.deleteMedItem);

//Update medItem by Id
router.put(
  "/:medItemId",
  [
    body("articleName", "Article name is Required.").not().isEmpty(),
    body("category","Category of medicine item is Required.").not().isEmpty()
  ],
  MedItemController.updateMedItem
);

module.exports = router;
