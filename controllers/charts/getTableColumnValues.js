const { pool } = require("../../models/connection");

const getTableColumnValues = async (req, res, next) => {
  const { table, column } = req.params;

  const dynamicQuery = `SELECT ${column} FROM ${table}`;
  // SELECT column_name FROM table_name

  try {
    pool.query(dynamicQuery, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
          data: err,
        });
      }

      function getUniqueValues(result, key) {
        const uniqueValues = [...new Set(result.map((item) => item[key]))];
        return uniqueValues;
      }

      const uniqueValuesInColumn = getUniqueValues(result, column);

      res.status(200).json({
        message: "table field (column) values",
        code: 200,
        length: uniqueValuesInColumn.length,
        data: uniqueValuesInColumn,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTableColumnValues };
