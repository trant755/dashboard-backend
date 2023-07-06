const express = require("express");
const tableRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares/ctrlWrapper");

// const { getTableData } = require("../../controllers/tables/getTableData");
// tableRouter.get("/getTableData/:table", ctrlWrapper(getTableData));

const {
  getTranformedData,
  getTranformedDataBar,
  getTranformedDataDonut,
  getDataForBar,
  getSumDataForBar,
} = require("../../controllers/tables");

tableRouter.get("/getSumDataForBar/:table/bar", ctrlWrapper(getSumDataForBar));

tableRouter.get("/getDataForBar/:table/bar", ctrlWrapper(getDataForBar));

tableRouter.get("/getTranformedData/:table", ctrlWrapper(getTranformedData));

tableRouter.get(
  "/getTranformedDataBar/:table/bar",
  ctrlWrapper(getTranformedDataBar)
);

tableRouter.get(
  "/getTranformedDataDonut/:table/donut",
  ctrlWrapper(getTranformedDataDonut)
);

module.exports = tableRouter;
