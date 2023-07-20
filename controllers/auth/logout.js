const { pool } = require("../../models/connection");

const logout = async (req, res, next) => {
  const { id } = req.user;

  const user = `SELECT id FROM dep_users WHERE id = '${id}'`;

  try {
    pool.query(user, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
          data: err,
        });
      }

      if (!result.length) {
        return res.status(401).json({
          message: "not authorized",
          code: 401,
        });
      }

      const updateToken = `UPDATE dep_users SET token = NULL WHERE id = '${id}'`;

      pool.query(updateToken, (err, result) => {
        if (err) {
          return res.status(404).json({
            message: "not found",
            code: 404,
          });
        }

        res.json({
          message: "no content",
          code: 204,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logout };
