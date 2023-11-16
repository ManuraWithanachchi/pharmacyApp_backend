const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const IssueController = require("../../controllers/issue");
const Issue = require("../../models/issue")

router.post(
  "/",
  [
    body("articleName", "Name of the article is Required.").not().isEmpty(),
    body("date", "Date is Required.").not().isEmpty(),
    body("expireDate", "Expire Date is Required.").not().isEmpty(),
    body("to", "Received from whom: is Required.").not().isEmpty(),
    body("quantity", "Quantity is Required.").not().isEmpty(),
  ],
  IssueController.createIssue
);

// Gettting all receipts
router.get("/",IssueController.getIssues );

//Getting receipts based on the article name
router.get("/:articleName", IssueController.getIssuesByArticleName)

module.exports = router;
