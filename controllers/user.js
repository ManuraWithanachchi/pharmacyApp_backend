const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

// Importing  model of the User
const User = require("../models/User");

// Register User to the system
exports.registerUser = async (req, res) => {
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, nic, email, mobile, password } = req.body;

  try {
    // Check whether the User already registerd or Not
    let user = await User.findOne({ mobile: mobile });

    if (user) {
      res.status(400).json({ errors: [{ msg: "User alrady exsist" }] });
    }

    user = new User({
      firstName,
      lastName,
      email,
      nic,
      mobile,
      password,
    });

    // Encrypt the Password of the User
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user in the database
    await user.save();

    // Issuing jsonwebtoken to user 

    const payload = {
      user: {
        
        firstName: user.firstName,
        lastName: user.lastName,
        nic : user.nic,
        mobile: user.mobile,
        userRole: user.userRole,
      },
    };

    jwt.sign(
      payload,
      config.get("JWTSecret"),
      {
        expiresIn: 36000,   // Expire the Token after 10 Hrs ( for Web App)
      },
      (error, token) => {
        if (error) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

