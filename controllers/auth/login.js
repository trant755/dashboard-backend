const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../../models/connection");

const SECRET_KEY = process.env.SECRET;

const login = async (req, res, next) => {
  const { login, password } = req.body;

  const userQuery = `SELECT * FROM dep_users WHERE login = '${login}'`;

  try {
    pool.query(userQuery, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
          data: err,
        });
      }

      if (!result.length) {
        return res.status(401).json({
          message: "login or password is wrong",
          code: 401,
        });
      }

      const validPassword = bcrypt.compareSync(password, result[0].password);

      if (!validPassword) {
        return res.status(401).json({
          message: "login or password is wrong",
          code: 401,
        });
      }

      // if (!validPassword) {
      //   // !result[0].verify - here can be additional condition in if statement if we have email varification
      //   console.log("here__2");

      //   return res.status(401).json({
      //     code: 401,
      //     message: "Login or password is wrong",
      //   });
      // }

      const {
        id,
        login,
        email,
        surname,
        firstName,
        lastName,
        phone,
        position,
        access,
        district,
        hromada,
      } = result[0];

      const payload = { id };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
      const updateToken = `UPDATE dep_users SET token = '${token}' WHERE id = '${result[0].id}'`;

      pool.query(updateToken, (err, result) => {
        if (err) {
          return res.status(404).json({
            message: err.message,
            code: 404,
          });
        }

        res.json({
          message: "success",
          token,
          data: {
            user: {
              id,
              login,
              email,
              surname,
              firstName,
              lastName,
              phone,
              position,
              access,
              district,
              hromada,
            },
          },
          code: 200,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
