const express = require("express");
const chartsRouter = express.Router();

const { ctrlWrapper } = require("../../../middlewares/ctrlWrapper");
const { getAllCharts } = require("../../../controllers/getAllCharts");

chartsRouter.get("/", ctrlWrapper(getAllCharts));

// chartsRouter.get("/chartName/:chartName", ctrlWrapper(getChartByName));

module.exports = chartsRouter;
