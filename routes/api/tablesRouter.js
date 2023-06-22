const express = require("express");
const tableRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares/ctrlWrapper");

const { getTableData } = require("../../controllers/tables/getTableData");

tableRouter.get("/getTableData/:table", ctrlWrapper(getTableData));

module.exports = tableRouter;
