const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const ReceiptController = require("../../controllers/receipt");
const Receipt = require("../../models/receipt")

router.post(
  "/",
  [
    body("articleName", "Name of the article is Required.").not().isEmpty(),
    body("date", "Date is Required.").not().isEmpty(),
    body("from", "Received from whom: is Required.").not().isEmpty(),
    body("quantity", "Quantity is Required.").not().isEmpty(),
  ],
  ReceiptController.createReceipt
);

// Gettting all receipts
router.get("/",ReceiptController.getReceipts );

//Getting receipts based on the article name
router.get("/:articleName", ReceiptController.getReceiptsByArticleName)

module.exports = router;
