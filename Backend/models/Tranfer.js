const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  description: String,
  timestamp: { type: Date, default: Date.now },
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
