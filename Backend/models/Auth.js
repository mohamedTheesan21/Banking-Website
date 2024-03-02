const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness of usernames
    },
    password: {
        type: String,
    }
});

// Set up passport-local-mongoose
authSchema.plugin(passportLocalMongoose);

const Auth = new mongoose.model("Auth", authSchema);

passport.use(Auth.createStrategy());
passport.serializeUser(Auth.serializeUser());
passport.deserializeUser(Auth.deserializeUser());

module.exports = Auth;
