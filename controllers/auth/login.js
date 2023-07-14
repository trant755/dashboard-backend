const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool, poolNickDB } = require("../../models/connection");

const SECRET_KEY = process.env.SECRET;

const login = async (req, res, next) => {
  const {
    login,
    email,
    password,
    surname,
    firstName,
    lastName,
    phone,
    position = "user",
    district,
    hromada,
  } = req.body;

  const user = `SELECT * FROM dep_users WHERE email = '${email}'`;

  console.log("---user:", user);

  try {
    pool.query(user, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
          data: err,
        });
      }

      console.log("result:", result);

      if (!result.length) {
        console.log("here???");

        return res.status(401).json({
          code: 401,
          message: "Email or password is wrong",
        });
      }

      const validPassword = bcrypt.compareSync(password, result[0].password);

      console.log("++++password:", result[0].password);
      console.log("++++result[0].password:", result[0].password);

      console.log("validPassword:");

      console.log("!validPassword", !validPassword);

      if (!validPassword) {
        // !result[0].verify - here can be additional condition in if statement if we have email varification
        console.log("here???__2");

        return res.status(401).json({
          code: 401,
          message: "Email or password is wrong",
        });
      }

      const payload = {
        id: result[0].id,
      };

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
          status: "logged in",
          data: {
            // user: {
            //   email,
            // },
            token,
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
