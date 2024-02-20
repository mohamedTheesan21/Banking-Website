const express = require("express");
const bodyParser = require("body-parser");
const dbConnect = require("./dbConnect");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3001, () => {
    console.log("server is running port 3001");
    dbConnect();
})