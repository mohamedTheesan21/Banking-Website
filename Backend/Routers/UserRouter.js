
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Auth = require("../models/Auth");
const {
  generateVerificationCodeAndSave,
  verifyUser,
} = require("../verification");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Register a new user
router.post("/register", async (req, res) => {
  const formData = req.body;
  try {
    const existingUser = await User.findOne({
      email: formData.email,
      phoneNo: formData.phoneNumber,
      accountID: formData.accountNumber,
    });
    if (existingUser) {
      if (!existingUser.auth) {
        generateVerificationCodeAndSave(formData.email);
        res.status(200).send("Verification code sent");
      } else {
        res.status(400).send("User already registered");
      }
    } else {
      res.status(404).send("User does not exist");
    }
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    res.status(500).send("Error querying MongoDB");
  }
});

// Verify user with verification code
router.post("/verify", async (req, res) => {
  const formData = req.body;
  if (verifyUser(formData.email, formData.verificationCode)) {
    res.status(200).send("User verified");
  } else {
    res.status(404).send("User not verified");
  }
});

// Sign up a new user
router.post("/signup", async (req, res) => {
  console.log("Signup request received");
  const formData = req.body;
  const existingUser = await User.findOne({ email: formData.email });
  if (existingUser) {
    try {
      const newUser = new Auth({ username: formData.username });
      // Set the password using setPassword method provided by passport-local-mongoose
      await newUser.setPassword(formData.password);
      // Save the new user
      await newUser.save();
      await existingUser.updateOne({ auth: newUser });
      console.log("User registered");
      res.status(200).send("User registered");
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send("Error registering user");
    }
  }
});

// Sign in a user
router.post("/signin", async (req, res) => {
  const newAuth = new Auth({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(newAuth, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error logging in");
    } else {
      passport.authenticate("local")(req, res, () => {
        const token = jwt.sign({ username: req.body.username }, "your_secret_key", {
            expiresIn: "1h"
          });
        res.status(200).json({ token });
      });
    }
  });
});

module.exports = router;
