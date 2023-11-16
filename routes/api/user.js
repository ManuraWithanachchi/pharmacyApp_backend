const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// bring user controller
const userController = require("../../controllers/user");

// Register User Route for Web App
router.post(
  "/",
  [
    check("firstName", "First Name can NOT Empty").not().isEmpty(),
    check("lastName", "Last Name can NOT Empty").not().isEmpty(),
    check("nic", "NIC Number can NOT Empty").not().isEmpty(),
    check("email", "Email you entered is NOT Valid").isEmail(),
    check("mobile", "Mobile you entered is NOT Valid").isLength({
      // if we enter it starting with 0, or with country code
      min: 10,
      max: 12,
    }),
    check("password", "Password must contain at least 8 Characters").isLength({
      min: 8,
    }),
  ],
  userController.registerUser
);

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
