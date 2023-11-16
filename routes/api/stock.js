const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const stockController = require("../../controllers/stock");
const Stock = require("../../models/stock")

router.post(
  "/",
  [
    body("articleName", "Name of the article is Required.").not().isEmpty(),
    body("expireDate", "Date is Required.").not().isEmpty(),
    body("totalQuantity", "Total Quantity is Required.").not().isEmpty(),
    body("availableQuantity", "Available Quantity is Required.").not().isEmpty(),
  ],
  stockController.createStock
);

// Gettting all stocks
router.get("/",stockController.getStocks );

//Getting stocks based on the article name
router.get("/:articleName", stockController.getStocksByArticleName)

//Getting stocks having expire dates within next 30 days.
router.get("/expireRecent",stockController.getStocksWithin30Days)

//Getting stocks By expire date
router.post("/expireDate",stockController.getStocksByExpireDateAndArticleName)

module.exports = router;
