const express = require("express");
const doctorCategory = require("../../models/doctorCategory");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const category = await doctorCategory.find();
    res.send(category);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", (req, res) => {
  doctorCategory.exists(
    { doctorCategory: req.body.doctorCategory },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        if (!doc) {
          const doctor_category = new doctorCategory({
            doctorCategory: req.body.doctorCategory,
          });
          try {
            doctor_category.save();
            res.send("Doctor Category Added Successfully");
          } catch (err) {
            res.status(400).send(err);
          }
        } else {
          res.send("This category is already exist");
        }
      }
    }
  );
});

module.exports = router;
