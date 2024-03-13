const mongoose = require("mongoose");
const moment = require('moment');

const transferSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  senderBalance: Number,
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverBalance: Number,
  amount: Number,
  description: String,
  date: { 
    type: String,
    default: () => new Date().toISOString().split("T")[0] // Function returning default value
  },
  time: { 
    type: String,
    default: () => {
      const now = new Date();
      return `${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}`;
    }
  },
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
