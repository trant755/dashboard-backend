const express = require("express");
const usersRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares");
const {
  getAllUsers,
  signup,
  login,
  logout,
} = require("../../controllers/auth");

const {
  authMiddleware,
  signupValidation,
  loginValidation,
} = require("../../middlewares");

usersRouter.get("/getAllUsers", ctrlWrapper(getAllUsers));
usersRouter.post("/signup", signupValidation, ctrlWrapper(signup));
usersRouter.post("/login", loginValidation, ctrlWrapper(login));
usersRouter.get("/logout", authMiddleware, ctrlWrapper(logout));

module.exports = usersRouter;
