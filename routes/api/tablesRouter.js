const express = require("express");
const tableRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares");

const {
  getTranformedData,
  getTranformedDataBar,
  getTranformedDataDonut,
  getDataForBar,
  getSumDataForBar,
  getDataForBarSQL,
  getDataForChartKnex,
} = require("../../controllers/tables");

tableRouter.get("/getDataForBar/:table", ctrlWrapper(getDataForBar));

tableRouter.get("/getDataForBarSQL/:table", ctrlWrapper(getDataForBarSQL));

tableRouter.get("/getSumDataForBar/:table/bar", ctrlWrapper(getSumDataForBar));

tableRouter.get(
  "/getDataForChartKnex/:table",
  ctrlWrapper(getDataForChartKnex)
);

// test routes
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
