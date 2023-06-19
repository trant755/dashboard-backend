const express = require("express");
const usersRouter = express.Router();

const { ctrlWrapper } = require("../../../middlewares/ctrlWrapper");

// get all tables
usersRouter.get("/signup", (req, res, next) => {
  console.log("Signup controller");
  try {
    return res.status(200).json({
      message: "Signup controller",
      code: 200,
      // data: finalArr,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Not found",
      code: 404,
      data: err,
    });
  }
});
// usersRouter.get("/tables", ctrlWrapper(getAllTables));

module.exports = usersRouter;
