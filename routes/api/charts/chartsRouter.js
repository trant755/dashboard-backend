const express = require("express");
const chartsRouter = express.Router();

const { ctrlWrapper } = require("../../../middlewares/ctrlWrapper");

const {
  getMainShelters,
} = require("../../../controllers/shelters/getMainShelters");
const {
  getSheltersByParams,
} = require("../../../controllers/shelters/getSheltersByParams");
const {
  getSheltersByParamsReusable,
} = require("../../../controllers/shelters/getSheltersByParamsReusable");

chartsRouter.get("/shelters/main", ctrlWrapper(getMainShelters));

chartsRouter.get("/shelters/main/byParams", ctrlWrapper(getSheltersByParams));

chartsRouter.get(
  "/shelters/main/byParamsReus",
  ctrlWrapper(getSheltersByParamsReusable)
);

// chartsRouter.get("/shelters/district", ctrlWrapper(getMainShelters));

// chartsRouter.get("/shelters/hromadas", ctrlWrapper(getMainShelters));

module.exports = chartsRouter;
