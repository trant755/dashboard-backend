require("dotenv").config();
const jwt = require("jsonwebtoken");
const { pool } = require("../models/connection");

const SECRET_KEY = process.env.SECRET;

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer" && !token) {
      return res.status(401).json({
        message: "not authorized",
        code: 401,
      });
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = `SELECT * FROM dep_users WHERE id = '${id}'`;

    pool.query(user, (err, result) => {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      if (!result.length || !result[0].token) {
        return res.status(401).json({
          message: "Not authorized",
          code: 401,
        });
      }

      req.user = result[0];
      next();
    });
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = { authMiddleware };
