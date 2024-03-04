const mongoose = require("mongoose");
const authSchema = require("./Auth").schema;

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNo: String,
  accountID: String,
  balance: Number,
  branch: String,
  auth: authSchema
});


module.exports = mongoose.model("User", userSchema);
