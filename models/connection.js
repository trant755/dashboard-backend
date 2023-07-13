const mysql = require("mysql");

const knex = require("knex")({
  client: "mysql",
  connection: {
    port: 4004,
    host: process.env.SERVERNAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
  },
});

const pool = mysql.createConnection({
  host: process.env.SERVERNAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

console.log("server:", process.env.SERVERNAME);

const connectToSQL = async () => {
  return pool.connect(function (err) {
    if (err) throw err;
    console.log("Database connection successful");
  });
};

module.exports = { pool, knex, connectToSQL };
