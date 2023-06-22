const { pool } = require("../../models/connection");

const createTable = () => {
  const table = `CREATE TABLE users (
        id int NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255), 
        last_name VARCHAR(255),
        photo  VARCHAR(555),
        email VARCHAR(255), 
        password VARCHAR(255), 
        status VARCHAR(255),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_DATE(),
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_DATE(),
        PRIMARY KEY (id)
           )`;
};

try {
  pool.query(table, function (err, result) {
    if (err) throw err;
    console.log("User Table created", result);
  });
} catch (error) {
  console.log(error.message);
}

module.exports = { createTable };
