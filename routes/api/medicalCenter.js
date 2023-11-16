const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const MedicalCenterController = require("../../controllers/medicalCenter");
const MedicalCenter = require("../../models/MedicalCenter");

router.post(
  "/",
  [
    body("name", "Medical center name is Required.").not().isEmpty(),
    body("owner_name", "Medical center owner name is Required.")
      .not()
      .isEmpty(),
    body(
      "medical_center_registration_No",
      "Medical center Reg. Number is Required."
    )
      .not()
      .isEmpty(),
    body("owner_nic", "Medical center Owner NIC is Required.").not().isEmpty(),
    body("district_id", "Medical center District is Required.").not().isEmpty(),
    body("address", "Medical center Address is Required.").not().isEmpty(),
    body(
      "contact_No_Landline",
      "Medical center Contact Landline is Required."
    ).isLength({ min: 10, max: 12 }),
    body(
      "contact_No_Mobile",
      "Medical center Contact mobile is Required."
    ).isLength({ min: 10, max: 12 }),
    body("logoURL", "Medical center logoURL is Required.").not().isEmpty(),
    body(
      "RegisterCertificateImageURL",
      "Medical center Register certificate Image is Required."
    )
      .not()
      .isEmpty(),
    body("password", "Medical center password must have atleast 8 characters.")
      .not()
      .isEmpty()
      .isLength({ min: 8 }),
    body(
      "business_email",
      "Medical center Business email is Required."
    ).isEmail(),
  ],
  MedicalCenterController.registerMedicalCenter
);

router.get("/", async (req, res) => {
  try {
    const medicalCenters = await MedicalCenter.find();
    res.send(medicalCenters);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
