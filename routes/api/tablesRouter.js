const express = require("express");
const tableRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares");

const {
  getTranformedData,
  getTranformedDataBar,
  getTranformedDataDonut,
  getDataForBar,
  getSumDataForBar,
} = require("../../controllers/tables");

tableRouter.get("/getDataForBar/:table", ctrlWrapper(getDataForBar));

tableRouter.get("/getSumDataForBar/:table/bar", ctrlWrapper(getSumDataForBar));

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
