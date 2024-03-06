require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConnect = require("./dbConnect");
const path = require("path");
const cors = require("cors");
const User = require("./models/User");
const Auth = require("./models/Auth");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const userRouter = require("./Routers/UserRouter");
const jwt = require("jsonwebtoken");
const Transfer = require("./models/Transfer");
// const cookieParser = require("cookie-parser")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to parse json data
app.use(cors());
// app.use(cookieParser());

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

// Session Serialization and Deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// const sender = new User({
//   name: "Mohamed Theesan",
//   email: "mohamedtheesan319@gmail.com",
//   phoneNo: "1234567890",
//   accountID: "83451212",
//   balance: 1000.5,
//   branch: "Mutur"
// });

// // Save the new user to the database
// sender
//   .save()
//   .then((savedUser) => {
//     console.log("User saved successfully:", savedUser);
//   })
//   .catch((error) => {
//     console.error("Error saving user:", error);
//   });

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "build")));

app.use("/user", userRouter);

// Middleware to verify JWT token
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

// Route to handle GET /account
app.get("/account", verifyToken, async (req, res) => {
  // This endpoint is protected and requires a valid JWT token
  const newAuth = await Auth.findOne({ username: req.user.username });
  const sender = await User.findOne({ auth: newAuth._id });
  if (sender) {
    const user = {
      name: sender.name,
      email: sender.email,
      phoneNo: sender.phoneNo,
      accountID: sender.accountID,
      balance: sender.balance,
      branch: sender.branch,
    };
    res.status(200).json({ message: "User found", user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Route to handle POST /account/transfer
app.post("/account/transfer", verifyToken, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newAuth = await Auth.findOne({ username: req.user.username }).session(session);
    const sender = await User.findOne({ auth: newAuth._id }).session(session);
    const formData = req.body;

    // Perform your transactional operations here

    // Example: Update user balances
    sender.balance -= parseFloat(formData.amount);
    await sender.save();

    const receiver = await User.findOne({accountID: formData.accountNo}).session(session);

    if (!receiver) {
      res.status(400).json({ message: "Invalid Account Number" });
      return;
    }
    else{
      receiver.balance += parseFloat(formData.amount);
      await receiver.save();
    }

    // Example: Log the transfer
    const transfer = new Transfer({
      receiver: formData.receiverId,
      amount: formData.amount,
      description: formData.description,
    });
    await transfer.save();

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({message:"Transfer successful"});
    console.log("Transfer successful");
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();
    console.error("Error performing transfer:", error);
    res.status(500).json({message:"Error performing transfer"});
  }
});

app.listen(3001, () => {
  console.log("server is running port 3001");
  dbConnect();
});
