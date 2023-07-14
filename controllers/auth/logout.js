const { pool } = require("../../models/connection");

const logout = async (req, res, next) => {
  const { id } = req.user;
  const user = `SELECT id FROM dep_users WHERE id = '${id}'`;
  console.log("user", user);

  if (!user) {
    return res.status(401).json({
      message: "Not authorized",
      code: 401,
    });
  }

  const updateToken = `UPDATE myusers SET token = NULL WHERE id = '${id}'`;

  pool.query(updateToken, (err, result) => {
    if (err) {
      return res.status(404).json({
        message: "not found",
        code: 404,
      });
    }

    res.json({
      status: "logged out",
      code: 200,
    });
  });
};

module.exports = { logout };
