const mysql = require("mysql");

// const pool = mysql.createConnection({
//   host: process.env.SERVERNAME,
//   user: process.env.USER,
//   // password: process.env.PASSWORD,
//   database: process.env.DB,
// });

const pool = mysql.createConnection({
  host: process.env.SERVERNAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

console.log(process.env.SERVERNAME, process.env.USER, process.env.DB);

const connectToSQL = async () => {
  return pool.connect(function (err) {
    if (err) throw err;
    console.log("Database connection successful");
  });
};

module.exports = { pool, connectToSQL };
