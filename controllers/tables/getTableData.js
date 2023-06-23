const { pool } = require("../../models/connection");
const { mathMethods } = require("../../mathMethods.js");
const {
  generateTemplateString,
} = require("../../helpers/generateTemplateString");

const getTableData = async (req, res, next) => {
  const { table } = req.params;
  const { column, method, condition } = req.query;

  let dynamicQuery = `SELECT ${column} FROM ${table}`;

  if (column) {
    const allColumns = column.split("/").map((item) => {
      const splitedItem = item.split("-");
      return { key: splitedItem[0], value: splitedItem[1] };
    });
  }

  if (condition) {
    const allConditions = condition.split("/").map((item) => {
      const splitedItem = item.split("-");
      return { key: splitedItem[0], value: splitedItem[1] };
    });

    console.log(allConditions);

    const templateString = generateTemplateString(allConditions);

    dynamicQuery = `SELECT ${column} FROM ${table} WHERE ${templateString}`;
  }

  // let dynamicQuery = `SELECT ${column} FROM ${table} WHERE ${allConditions[0].key} = '${allConditions[0].value}'`;

  // if (allConditions.length > 1) {
  //   const templateString = generateTemplateString(allConditions);

  //   dynamicQuery = `SELECT ${column} FROM ${table} WHERE ${templateString}`;
  // }

  try {
    pool.query(dynamicQuery, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
          data: err,
        });
      }

      let newResult = result;
      if (method) {
        newResult = mathMethods[method](column, result);
      }

      res.status(200).json({
        message: "table column values",
        code: 200,
        length: newResult.length,
        data: newResult,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTableData };
