const mongoose = require("mongoose");
require("dotenv").config();
const password = process.env.DB_PASSWORD;
const DB_URL = `mongodb+srv://admin:${password}@myatlasclusteredu.zdyf7zp.mongodb.net/bankDB`;;

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