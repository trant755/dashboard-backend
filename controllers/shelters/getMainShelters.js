// const { Chart } = require("../models/orderModel");
const mysql = require("mysql");
// const connection = require("../../models/connection");
// const connectToSQL = require("../../models/connection");
const connection = mysql.createConnection({
  host: process.env.SERVERNAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

const getMainShelters = async (req, res, next) => {
  try {
    console.log("res---------", res);

    const allShelters = "SELECT * FROM zaktable";

    const result = await connection.query(
      allShelters,
      function (err, result, fields) {
        if (err) throw err;
        console.log("result[0]", result[0]);
      }
    );

    if (!result) {
      return res.status(400).json({
        message: "error",
        code: 400,
        data: result,
      });
    }

    console.log("******", result[0]);

    return res.status(200).json({
      message: "main shelters",
      code: 200,
      data: result[0],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getMainShelters };
