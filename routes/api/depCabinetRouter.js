const express = require("express");
const usersRouter = express.Router();

const {
  ctrlWrapper,
  authMiddleware,
  messagesValidation,
} = require("../../middlewares");

const {
  getDepMessages,
  getDepMessagesByJoin,
  postDepMessagesByJoin,
} = require("../../controllers/depCabinet");

usersRouter.get("/user-messages", authMiddleware, ctrlWrapper(getDepMessages));

usersRouter.get(
  "/user-messages-join",
  authMiddleware,
  ctrlWrapper(getDepMessagesByJoin)
);

usersRouter.post(
  "/add-message",
  messagesValidation,
  ctrlWrapper(postDepMessagesByJoin)
);

module.exports = usersRouter;
