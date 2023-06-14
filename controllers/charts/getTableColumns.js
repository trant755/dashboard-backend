const { pool } = require("../../models/connection");

const getTableColumns = async (req, res, next) => {
  const { table } = req.params;

  const dynamicQuery = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}'`;
  // SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = table_name

  try {
    pool.query(dynamicQuery, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
          data: err,
        });
      }

      const values = result.map((obj) => obj.COLUMN_NAME);

      res.status(200).json({
        message: "table columns",
        code: 200,
        length: result.length,
        data: values,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTableColumns };
