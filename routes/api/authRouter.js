const express = require("express");
const usersRouter = express.Router();

const {
  ctrlWrapper,
  authMiddleware,
  signupValidation,
  loginValidation,
} = require("../../middlewares");

const {
  getAllUsers,
  getCurrentUser,
  signup,
  login,
  logout,
} = require("../../controllers/auth");

usersRouter.get("/all-users", ctrlWrapper(getAllUsers));

usersRouter.get("/current-user", authMiddleware, ctrlWrapper(getCurrentUser));

usersRouter.post("/signup", signupValidation, ctrlWrapper(signup));

usersRouter.post("/login", loginValidation, ctrlWrapper(login));

usersRouter.get("/logout", authMiddleware, ctrlWrapper(logout));

module.exports = usersRouter;
