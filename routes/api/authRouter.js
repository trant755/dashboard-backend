const express = require("express");
const usersRouter = express.Router();

const { ctrlWrapper } = require("../../middlewares/ctrlWrapper");
const {
  getAllUsers,
  signup,
  login,
  logout,
} = require("../../controllers/auth");
const { validateRegister } = require("../../middlewares/authValidation");

usersRouter.get("/getAllUsers", ctrlWrapper(getAllUsers));
usersRouter.post("/signup", validateRegister, ctrlWrapper(signup));
usersRouter.post("/login", ctrlWrapper(login));
usersRouter.post("/logout", ctrlWrapper(logout));

module.exports = usersRouter;
