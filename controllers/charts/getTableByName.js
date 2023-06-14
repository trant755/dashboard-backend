const { pool } = require("../../models/connection");

const getTableByName = async (req, res, next) => {
  const { table } = req.params;

  const dynamicQuery = `SELECT * FROM ${table}`;
  //  "SELECT * FROM zaktable"

  try {
    pool.query(dynamicQuery, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
          data: err,
        });
      }

      res.status(200).json({
        message: "table by name",
        code: 200,
        length: result.length,
        data: result,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTableByName };
