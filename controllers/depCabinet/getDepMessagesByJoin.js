const { pool } = require("../../models/connection");

const getDepMessagesByJoin = async (req, res, next) => {
  const { id } = req.user;

  const messagesQueryOda = () => {
    return `SELECT 
  m.id,
  m.senderName,
  m.senderEmail,
  m.title,
  m.text,
  m.isReaded,        
  m.isAnswered,
  m.isArchived,
  m.answeredAt,
  m.createdAt 
    FROM dep_messages AS m
    INNER JOIN dep_users AS u ON m.recieverLevel = u.access
    WHERE m.recieverLevel = 'oda';`;
  };

  const messagesQueryDistrict = (district) => {
    return `SELECT 
  m.id,
  m.senderName,
  m.senderEmail,
  m.title,
  m.text,
  m.isReaded,        
  m.isAnswered,
  m.isArchived,
  m.answeredAt,
  m.createdAt 
    FROM dep_messages AS m
    INNER JOIN dep_users AS u ON m.recieverLevel = u.access
    AND m.recieverDistrict = u.district
    WHERE m.recieverLevel = 'district' AND m.recieverDistrict = '${district}';`;
  };

  const messagesQueryHromada = (district, hromada) => {
    return `SELECT 
  m.id,
  m.senderName,
  m.senderEmail,
  m.title,
  m.text,
  m.isReaded,        
  m.isAnswered,
  m.isArchived,
  m.answeredAt,
  m.createdAt 
    FROM dep_messages AS m
    INNER JOIN dep_users AS u ON m.recieverLevel = u.access
                             AND m.recieverDistrict = u.district
                             AND m.recieverHromada = u.hromada
   WHERE m.recieverLevel = 'hromada' AND m.recieverDistrict = '${district}' AND m.recieverHromada = '${hromada}';`;
  };

  const messageQuery = `SELECT access, district, hromada
        FROM dep_users WHERE id = '${id}'`;

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
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      let queryByRole = "";

      if (result[0].access === "oda") {
        queryByRole = messagesQueryOda();
      }

      if (result[0].access === "district") {
        queryByRole = messagesQueryDistrict(result[0].district);
      }

      if (result[0].access === "hromada") {
        queryByRole = messagesQueryHromada(
          result[0].district,
          result[0].hromada
        );
      }

      pool.query(queryByRole, function (err, result, fields) {
        if (err) {
          return res.status(404).json({
            message: "not found",
            code: 404,
            data: err,
          });
        }

        if (!result.length) {
          return res.status(404).json({
            message: "not found",
            code: 404,
          });
        }

        res.json({
          message: "success",
          data: {
            length: result.length,
            userMessages: result,
          },
          code: 200,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getDepMessagesByJoin };
