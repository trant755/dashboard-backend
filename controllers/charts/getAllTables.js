const { pool } = require("../../models/connection");
const { querys } = require("../../models/querys");

const getAllTables = async (req, res, next) => {
  try {
    pool.query(querys.allTables, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
          data: err,
        });
      }

      res.status(200).json({
        message: "all tables",
        code: 200,
        length: result.length,
        data: result,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllTables };
