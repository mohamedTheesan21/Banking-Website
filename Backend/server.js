const express = require("express");
const bodyParser = require("body-parser");
const dbConnect = require("./dbConnect");
const path = require("path");
const cors = require("cors");
const User = require("./models/User");
const userSchema = require("./models/User").schema;
const Auth = require("./models/Auth");
const authSchema = require("./models/Auth").schema;
const {
  generateVerificationCodeAndSave,
  verifyUser,
} = require("./verification");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const findOrCreate = require("mongoose-findorcreate");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to parse json data
app.use(cors());

// Set up express-session
app.use(
  session({
    secret: "My_name_is_Mohamed_Theesan",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// const newUser = new User({
//   name: "Mohamed Theesan",
//   email: "mohamedtheesan319@gmail.com",
//   phoneNo: "1234567890",
//   accountID: "83451212",
//   balance: 1000.5,
// });

// // Save the new user to the database
// newUser
//   .save()
//   .then((savedUser) => {
//     console.log("User saved successfully:", savedUser);
//   })
//   .catch((error) => {
//     console.error("Error saving user:", error);
//   });

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "build")));

app.post("/register", async (req, res) => {
  const formData = req.body;
  try {
    const existingUser = await User.findOne({
      email: formData.email,
      phoneNo: formData.phoneNumber,
      accountID: formData.accountNumber,
    });
    if (existingUser) {
      generateVerificationCodeAndSave(formData.email);
      res.status(200).send("Verification code sent");
    } else {
      res.status(404).send("User does not exist");
      console.log("User does not exist");
    }
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    res.status(500).send("Error querying MongoDB");
  }
});

app.post("/verify", async (req, res) => {
  const formData = req.body;
  if (verifyUser(formData.email, formData.verificationCode)) {
    res.status(200).send("User verified");
  } else {
    res.status(404).send("User not verified");
  }
});

app.post("/signup", async (req, res) => {
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

app.listen(3001, () => {
  console.log("server is running port 3001");
  dbConnect();
});
