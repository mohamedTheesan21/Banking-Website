const express = require("express");
const bodyParser = require("body-parser");
const dbConnect = require("./dbConnect");
const path = require("path");
const cors = require("cors");
const User = require("./models/User");
const { generateVerificationCodeAndSave, verifyUser } = require("./verification");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to parse json data
app.use(cors());

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

// Serve React app for any route except "/register" (assuming "/register" is your backend route)
// app.get(/^\/(?!register).*/, (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/public/", "index.html"));
// });


app.post("/register", async (req, res) => {
  const formData = req.body;
  try {
    const existingUser = await User.findOne({email: formData.email, phoneNo: formData.phoneNumber, accountID: formData.accountNumber});
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
  if(verifyUser(formData.email, formData.verificationCode)){
    res.status(200).send("User verified");
  }
  else{
    res.status(404).send("User not verified");
  }
})

app.listen(3001, () => {
  console.log("server is running port 3001");
  dbConnect();
});
