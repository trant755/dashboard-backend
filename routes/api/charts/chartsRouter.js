const express = require("express");
const chartsRouter = express.Router();

const { ctrlWrapper } = require("../../../middlewares/ctrlWrapper");

const {
  getMainShelters,
} = require("../../../controllers/shelters/getMainShelters");

const {
  // getSheltersByParams,
} = require("../../../controllers/shelters/getSheltersByParams");
const { getByParams } = require("../../../controllers/shelters/getByParams");

// main dynamic route
chartsRouter.get("/params/:table", ctrlWrapper(getByParams));

chartsRouter.get("/shelters/main", ctrlWrapper(getMainShelters));

// chartsRouter.get("/shelters/main/byParams", ctrlWrapper(getSheltersByParams));

module.exports = chartsRouter;
