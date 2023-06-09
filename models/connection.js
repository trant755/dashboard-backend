// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

// const uriDb = process.env.MONGODB_URL;
// const connection = async () => mongoose.connect(uriDb);

// module.exports = connection

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  //   password: "yourpassword",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("mysql connected!");
});

module.exports = connection;
