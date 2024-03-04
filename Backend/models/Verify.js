const mongoose = require("mongoose");

const verifySchema = new mongoose.Schema({
    email: String,
    verificationCode: String,
    timestamp: Number,
});

module.exports = mongoose.model("Verify", verifySchema);