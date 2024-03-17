const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  senderBalance: Number,
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverBalance: Number,
  amount: Number,
  description: String,
  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0], // Function returning default value
  },
  time: {
    type: String,
    default: () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      return `${hours}.${minutes}.${seconds}`;
    },
  },
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
