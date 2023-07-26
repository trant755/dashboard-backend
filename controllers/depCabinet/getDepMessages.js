const { pool } = require("../../models/connection");

const getDepMessages = async (req, res, next) => {
  const { id } = req.user;

  const messageQuery = `SELECT id,
        senderName,
        senderEmail,
        title,
        text,
        isReaded,
        isAnswered,
        isArchived,
        answeredAt,
        createdAt
        FROM dep_messages WHERE userId = '${id}'`;

  try {
    pool.query(messageQuery, function (err, result, fields) {
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

      console.log("result:", result);

      res.json({
        message: "success",
        data: {
          length: result.length,
          userMessages: result,
        },
        code: 200,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getDepMessages };
