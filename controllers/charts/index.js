const { getAllTables } = require("./getAllTables");
const { getTableByName } = require("./getTableByName");
const { getTableColumns } = require("./getTableColumns");
const { getTableColumnValues } = require("./getTableColumnValues");
const { getDataByParams } = require("./getDataByParams");
const { getDataByParamsMatrix } = require("./getDataByParamsMatrix");

module.exports = {
  getDataByParamsMatrix,
  getAllTables,
  getTableByName,
  getTableColumns,
  getTableColumnValues,
  getDataByParams,
};
