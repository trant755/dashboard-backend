// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.SERVERNAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

const connectToSQL = async () => {
  return connection.connect(function (err) {
    if (err) throw err;

    console.log("Database connection successful");

    // const allShelters = "SELECT * FROM zaktable";

    // connection.query(allShelters, function (err, result, fields) {
    //   if (err) throw err;
    //   console.log(result);
    //   // console.log("----", fields);
    // });
  });
};

module.exports = { connection, connectToSQL };
