const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNo: String,
  accountID: String,
  balance: Number,
});


module.exports = mongoose.model("User", userSchema);
