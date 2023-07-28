const express = require("express");
const usersRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares");
const {
  getDepMessages,
  getDepMessagesByJoin,
} = require("../../controllers/depCabinet");

const { authMiddleware } = require("../../middlewares");

usersRouter.get("/user-messages", authMiddleware, ctrlWrapper(getDepMessages));
usersRouter.get(
  "/user-messages-join",
  authMiddleware,
  ctrlWrapper(getDepMessagesByJoin)
);

module.exports = usersRouter;
