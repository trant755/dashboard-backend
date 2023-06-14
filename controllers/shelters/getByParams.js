const { pool } = require("../../models/connection");

const getByParams = async (req, res, next) => {
  function generateTemplateString(obj) {
    const keys = Object.keys(obj);
    const template = keys.map((key) => `${key} = '${obj[key]}'`).join(" AND ");
    return template;
  }

  const { table } = req.params;
  console.log(table);

  const templateString = generateTemplateString(req.query);
  console.log(templateString);

  const dynamicQuery = `SELECT * FROM ${table} WHERE ${templateString}`;
  console.log(dynamicQuery);
  //  SELECT * FROM zaktable WHERE okay = 'придатна' AND bezpereshkodnyi = 'так'

  try {
    pool.query(dynamicQuery, function (err, result, fields) {
      if (err) {
        return res.status(400).json({
          message: "error",
          code: 400,
          data: result,
        });
      }

      res.status(200).json({
        message: "main shelters",
        code: 200,
        length: result.length,
        data: result,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getByParams };
