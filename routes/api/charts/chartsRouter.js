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

const {
  mainShelters,
  sheltersDistrict,
  sheltersHromada,
} = require("../../../controllers/shelters");

const {
  monitoringDistrict,
  monitoringHromada,
} = require("../../../controllers/monitoring");
const {
  financialHromadaData,
} = require("../../../controllers/financial/financialHromadaData");

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

// ------------ static querys from presentation------------
// shelters
chartsRouter.get("/shelters/mainShelters", ctrlWrapper(mainShelters));
chartsRouter.get(
  "/shelters/sheltersDistrict/:district",
  ctrlWrapper(sheltersDistrict)
);
chartsRouter.get(
  "/shelters/sheltersHromada/:district/:hromada",
  ctrlWrapper(sheltersHromada)
);

// monitoring
chartsRouter.get(
  "/monitoring/monitoringDistrict/:district",
  ctrlWrapper(monitoringDistrict)
);
chartsRouter.get(
  "/monitoring/monitoringHromada/:district/:hromada",
  ctrlWrapper(monitoringHromada)
);

// financial
chartsRouter.get(
  "/financial/financialHromada/:hromada",
  ctrlWrapper(financialHromadaData)
);

module.exports = chartsRouter;
