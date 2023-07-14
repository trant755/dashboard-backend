const { pool } = require("../../models/connection");
const { querys } = require("../../models/querys");

const getAllUsers = async (req, res, next) => {
  const query = `SELECT * FROM dep_users`;

  try {
    pool.query(query, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
          data: err,
        });
      }

      res.status(200).json({
        message: "all users",
        code: 200,
        length: result.length,
        data: result,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers };
