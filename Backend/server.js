require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
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

// const newUser = new User({
//   name: "Mohamed Theesan",
//   email: "mohamedtheesan319@gmail.com",
//   phoneNo: "1234567890",
//   accountID: "83451212",
//   balance: 1000.5,
//   branch: "Mutur"
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
  const newAuth = await Auth.findOne({ username : req.user.username });
  const newUser = await User.findOne({ auth: newAuth._id });
  if (newUser) {
    const user = {
      name: newUser.name,
      email: newUser.email,
      phoneNo: newUser.phoneNo,
      accountID: newUser.accountID,
      balance: newUser.balance,
      branch: newUser.branch,
    };
    res.status(200).json({ message: "User found", user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Route to handle POST /account/transfer
app.post("/account/transfer", verifyToken, async (req, res) => {
  const newAuth = await Auth.findOne({ username : req.user.username });
  const newUser = await User.findOne({ auth: newAuth._id });
  const formData = req.body;
  console.log(formData);
  console.log(newUser);
})

app.listen(3001, () => {
  console.log("server is running port 3001");
  dbConnect();
});
