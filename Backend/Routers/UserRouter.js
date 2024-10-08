require("dotenv").config();
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

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

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
        const token = jwt.sign(
          { accountID: formData.accountNumber },
          process.env.KEY,
          {
            expiresIn: 5 * 60,
          }
        );
        res.status(200).json({ token });
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
router.post("/verify", verifyToken, async (req, res) => {
  if (!req.user) {
    res.status(403).json({ message: "Invalid token" });
  } else {
    const user = await User.findOne({ accountID: req.user.accountID });
    const formData = req.body;
    const isVerified = await verifyUser(user.email, formData.verificationCode);

    if (isVerified) {
      res.status(200).send("User verified");
    } else {
      res.status(404).json({ message: "Invalid verification code" });
    }
  }
});

// Sign up a new user
router.post("/signup", verifyToken, async (req, res) => {
  console.log("Signup request received");
  const user = await User.findOne({ accountID: req.user.accountID });
  const formData = req.body;
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    try {
      const newUser = new Auth({ username: formData.username });
      // Set the password using setPassword method provided by passport-local-mongoose
      await newUser.setPassword(formData.password);
      // Save the new user
      await newUser.save().then(async (user) => {
        console.log("User created successfully.");
        await existingUser.updateOne({ auth: newUser._id });
      });
      passport.authenticate("local")(req, res, () => {
        const token = jwt.sign(
          { username: formData.username },
          process.env.KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ token });
      });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyValue) {
        // Duplicate key error (E11000)
        res.status(400).json({ message: "Username is already taken" });
      } else {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user");
      }
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
      return res.status(500).json({ message: "Error during login" });
    } else {
      passport.authenticate("local", async (err, user) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Error during authentication" });
        }

        if (!user) {
          // Invalid username or password
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }

        req.login(user, { session: false }, async (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error during login" });
          }

          const token = jwt.sign(
            { username: req.body.username },
            process.env.KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({ token });
        });
      })(req, res);
    }
  });
});

router.post("/forgot%20password", async (req, res) => {
  const formData = req.body;
  const auth = await Auth.findOne({ username: formData.userName });
  const user = await User.findOne({ auth: auth._id });
  if (auth) {
    generateVerificationCodeAndSave(user.email);
    const token = jwt.sign({ username: formData.userName }, process.env.KEY, {
      expiresIn: 5 * 60,
    });
    return res.status(200).json({ token });
  } else {
    return res.status(404).json({ message: "user does not exist" });
  }
});

router.post("/FPverify", verifyToken, async (req, res) => {
  if (!req.user) {
    res.status(403).json({ message: "Invalid token" });
  } else {
    const auth = await Auth.findOne({ username: req.user.username });
    const user = await User.findOne({ auth: auth._id });
    const formData = req.body;
    if (user) {
      const isVerified = await verifyUser(
        user.email,
        formData.verificationCode,
      );

      if (isVerified) {
        res.status(200).send("User verified");
      } else {
        res.status(404).json({ message: "Invalid verification code" });
      }
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  }
});

router.post(
  "/forgot%20password/reset%20password",
  verifyToken,
  async (req, res) => {
    if (!req.user) {
      res.status(403).json({ message: "Invalid token" });
    } else {
      
      try {
        const auth = await Auth.findOne({ username: req.user.username });

        if (!auth) {
          return res.status(404).json({ message: "User not found" });
        }

        const newPassword = req.body.password;

        await auth.setPassword(newPassword);

        await auth.save();
      } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Error resetting password" });
      }

      res.status(200).json({ message: "Password reset successfully" });
    }
  }
);

module.exports = router;
