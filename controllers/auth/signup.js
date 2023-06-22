const { uid } = require("uid");
const bcrypt = require("bcryptjs");
const { pool } = require("../../models/connection");

const signup = async (req, res, next) => {
  const { username, email, password, role = "user" } = req.body;
  const user = `SELECT email FROM myusers WHERE email = '${email}'`;

  try {
    pool.query(user, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
          // data: err,
        });
      }

      if (result && result.length) {
        return res.status(409).json({
          code: 409,
          message: "Email in use",
        });
      }

      const newId = uid();

      // const verificationToken = uid(); - when use Sengrid
      const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      const newUserQuery =
        "INSERT INTO myusers (id, username, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?, now())";

      pool.query(
        newUserQuery,
        [newId, username, email, hashPassword, role],
        (err, result) => {
          if (err) {
            return res.status(404).json({
              message: err.message,
              code: 404,
            });
          }
          return res.status(201).json({
            message: "user created",
            code: 201,
          });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signup };
