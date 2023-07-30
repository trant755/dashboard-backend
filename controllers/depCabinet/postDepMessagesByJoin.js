const { pool } = require("../../models/connection");
const { createMessagePdf } = require("../../services/createMessagePdf");

const postDepMessagesByJoin = async (req, res, next) => {
  const {
    senderName,
    senderEmail,
    recieverLevel,
    recieverDistrict = null,
    recieverHromada = null,
    title,
    text,
  } = req.body;

  const newMessageQuery =
    "INSERT INTO dep_messages (senderName, senderEmail, recieverLevel, recieverDistrict, recieverHromada, title, text) VALUES (?, ?, ?, ?, ?, ?, ?)";

  try {
    pool.query(
      newMessageQuery,
      [
        senderName,
        senderEmail,
        recieverLevel,
        recieverDistrict,
        recieverHromada,
        title,
        text,
      ],
      async (err, result) => {
        if (err) {
          return res.status(404).json({
            message: err.message,
            code: 404,
          });
        }

        try {
          // Викликаємо функцію для створення PDF
          const filePath = await createMessagePdf(req.body);

          console.log("filePath", filePath);

          return res.status(201).json({
            message: "message created",
            code: 201,
            filePath: filePath, // Відправляємо шлях до створеного PDF файлу у відповідь
          });
        } catch (pdfError) {
          return res.status(500).json({ message: pdfError.message });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { postDepMessagesByJoin };
