const { getAllTables } = require("./getAllTables");
const { getTableByName } = require("./getTableByName");
const { getTableColumns } = require("./getTableColumns");
const { getTableColumnValues } = require("./getTableColumnValues");
const { getDataByParams } = require("./getDataByParams");

module.exports = {
  getAllTables,
  getTableByName,
  getTableColumns,
  getTableColumnValues,
  getDataByParams,
};
