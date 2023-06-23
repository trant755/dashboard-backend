const express = require("express");
const tableRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares/ctrlWrapper");

const { getTableData } = require("../../controllers/tables/getTableData");
const {
  getTranformedData,
} = require("../../controllers/tables/getTranformedData");

tableRouter.get("/getTableData/:table", ctrlWrapper(getTableData));

tableRouter.get("/getTranformedData/:table", ctrlWrapper(getTranformedData));

module.exports = tableRouter;
