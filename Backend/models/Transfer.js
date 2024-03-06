const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  description: String,
  timestamp: { 
    type: String,
    default: () => new Date().toISOString().split("T")[0] // Function returning default value
  },
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
