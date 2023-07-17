const mysql = require("mysql");

const knex = require("knex")({
  client: "mysql",
  connection: {
    port: 4004,
    host: process.env.SERVERNAME,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DB,
  },
});

const pool = mysql.createConnection({
  host: process.env.SERVERNAME,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

// connection to local test DB
const poolNickDB = mysql.createConnection({
  host: process.env.NICK_SERVERNAME,
  user: process.env.NICK_USER,
  password: process.env.NICK_PASSWORD,
  database: process.env.NICK_DB,
});

console.log("server:", process.env.SERVERNAME);

const connectToSQL = async () => {
  return pool.connect(function (err) {
    if (err) throw err;
    console.log("Database connection successful");
  });
};

module.exports = { pool, poolNickDB, knex, connectToSQL };
