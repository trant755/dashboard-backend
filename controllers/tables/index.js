const { getDataForBar } = require("./getDataForBar");
// const { getDataForBarSQL } = require("./getDataForBarSQL");
const { getDataForChartKnex } = require("./getDataForChartKnex");
const { getSumDataForBar } = require("./getSumDataForBar");
const { getTranformedData } = require("./getTranformedData");
const { getTranformedDataBar } = require("./getTranformedDataBar");
const { getTranformedDataDonut } = require("./getTranformedDataDonut");

module.exports = {
  getSumDataForBar,
  getDataForBar,
  getTranformedData,
  getTranformedDataBar,
  getTranformedDataDonut,
  // getDataForBarSQL,
  getDataForChartKnex,
};
