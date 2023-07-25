const express = require("express");
const usersRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares");
const { getDepMessages } = require("../../controllers/depCabinet");

const { authMiddleware } = require("../../middlewares");

usersRouter.get("/user-messages", authMiddleware, ctrlWrapper(getDepMessages));

module.exports = usersRouter;
