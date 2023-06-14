const express = require("express");
const chartsRouter = express.Router();

const { ctrlWrapper } = require("../../../middlewares/ctrlWrapper");

const {
  getAllTables,
  getTableByName,
  getDataByParams,
  getTableColumns,
  getTableColumnValues,
} = require("../../../controllers/charts");

// get all tables
chartsRouter.get("/tables", ctrlWrapper(getAllTables));

// get table by name
chartsRouter.get("/table/:table", ctrlWrapper(getTableByName));

// get table columns
chartsRouter.get("/columns/:table", ctrlWrapper(getTableColumns));

// get table column values
chartsRouter.get(
  "/columnValues/:table/:column",
  ctrlWrapper(getTableColumnValues)
);

// get table data by params
chartsRouter.get("/params/:table", ctrlWrapper(getDataByParams));

module.exports = chartsRouter;
