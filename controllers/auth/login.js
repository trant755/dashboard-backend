const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../../models/connection");

const SECRET_KEY = process.env.SECRET;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = `SELECT * FROM myusers WHERE email = '${email}'`;

  try {
    pool.query(user, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
          data: err,
        });
      }

      const validPassword = bcrypt.compareSync(password, result[0].password);

      if (!result.length || !validPassword) {
        // !result[0].verify - here can be additional condition in if statement if we have email varification
        console.log("result.password", result[0].password);
        console.log("validPassword", validPassword);

        return res.status(401).json({
          code: 401,
          message: "Email or password is wrong",
        });
      }

      const payload = {
        id: result[0].id,
      };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

      const updateTokenQuery = `UPDATE myusers SET token = '${token}' WHERE id = '${result[0].id}'`;

      console.log("updateToken", updateTokenQuery);

      pool.query(updateTokenQuery, (err, result) => {
        if (err) {
          return res.status(404).json({
            message: err.message,
            code: 404,
          });
        }

        res.json({
          status: "logged in",
          code: 200,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
