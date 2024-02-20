const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/BankDB";

async function dbConnect() {
  await mongoose
    .connect(
        DB_URL
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;