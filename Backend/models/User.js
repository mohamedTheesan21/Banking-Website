const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNo: String,
  accountID: String,
  balance: Number,
  branch: String,
  auth: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" }
});


module.exports = mongoose.model("User", userSchema);
