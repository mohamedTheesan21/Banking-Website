const mongoose = require("mongoose");

const BeneficiarySchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: true,
  },
  accountID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

const Beneficiary = new mongoose.model("Beneficiary", BeneficiarySchema);

module.exports = Beneficiary;
