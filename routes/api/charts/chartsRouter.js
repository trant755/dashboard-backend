const express = require("express");
const chartsRouter = express.Router();

const { ctrlWrapper } = require("../../../middlewares/ctrlWrapper");

const {
  getMainShelters,
} = require("../../../controllers/shelters/getMainShelters");

chartsRouter.get("/shelters/main", ctrlWrapper(getMainShelters));

// chartsRouter.get("/shelters/district", ctrlWrapper(getMainShelters));

// chartsRouter.get("/shelters/hromadas", ctrlWrapper(getMainShelters));

module.exports = chartsRouter;
