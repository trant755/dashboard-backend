const express = require("express");
const chartsRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares");

const {
  getAllTables,
  getTableByName,
  getDataByParams,
  getDataByParamsMatrix,
  getTableColumns,
  getTableColumnValues,
} = require("../../controllers/charts");

const {
  mainShelters,
  sheltersDistrict,
  sheltersHromada,
} = require("../../controllers/shelters");

const {
  monitoringDistrict,
  monitoringHromada,
} = require("../../controllers/monitoring");

const {
  financialHromadaData,
  financialMain,
} = require("../../controllers/financial");

const {
  osvitaDiaryMain,
  osvitaJournalMain,
  osvitaDiaryDistrict,
  osvitaDiaryHromada,
  osvitaJournalHromada,
  osvitaJournalDistrict,
} = require("../../controllers/osvita");

const {
  disabled,
  disabledAll,
  disabledType,
  disabledTypeHromada,
  disabledHromadasAll,
  disabledLiveStats,
  disabledLiveStatsType,
  disabledLiveStatsHromada,
} = require("../../controllers/cas");

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

// get table data by params
chartsRouter.get("/paramsMatrix/:table", ctrlWrapper(getDataByParamsMatrix));

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
chartsRouter.get("/financial/financialMain", ctrlWrapper(financialMain));

// osvita
chartsRouter.get("/osvita/osvitaDiaryMain", ctrlWrapper(osvitaDiaryMain));
chartsRouter.get(
  "/osvita/osvitaDiaryDistrict/:district",
  ctrlWrapper(osvitaDiaryDistrict)
);
chartsRouter.get(
  "/osvita/osvitaDiaryHromada/:district/:hromada",
  ctrlWrapper(osvitaDiaryHromada)
);
chartsRouter.get(
  "/osvita/osvitaJournalDistrict/:district",
  ctrlWrapper(osvitaJournalDistrict)
);
chartsRouter.get(
  "/osvita/osvitaJournalHromada/:district/:hromada",
  ctrlWrapper(osvitaJournalHromada)
);
chartsRouter.get("/osvita/osvitaJournalMain", ctrlWrapper(osvitaJournalMain));

// cas
chartsRouter.get("/cas/disabledAll/:district", ctrlWrapper(disabledAll));
chartsRouter.get("/cas/disabledType/:district", ctrlWrapper(disabledType));
chartsRouter.get(
  "/cas/disabledHromadasAll/:district/:hromada",
  ctrlWrapper(disabledHromadasAll)
);
chartsRouter.get(
  "/cas/disabledTypeHromada/:district/:hromada",
  ctrlWrapper(disabledTypeHromada)
);
chartsRouter.get(
  "/cas/disabledLiveStats/:district",
  ctrlWrapper(disabledLiveStats)
);
chartsRouter.get(
  "/cas/disabledLiveStatsType/:hromada/:type",
  ctrlWrapper(disabledLiveStatsType)
);
chartsRouter.get(
  "/cas/disabledLiveStatsHromada/:hromada",
  ctrlWrapper(disabledLiveStatsHromada)
);
chartsRouter.get("/cas/disabled", ctrlWrapper(disabled));

module.exports = chartsRouter;
