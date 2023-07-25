const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const chartsRouter = require("./routes/api/chartsRouter");
const tableRouter = require("./routes/api/tablesRouter");
const authRouter = require("./routes/api/authRouter");
const depCabinetRouter = require("./routes/api/depCabinetRouter");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/charts", chartsRouter);
app.use("/api/tables", tableRouter);
app.use("/api/auth", authRouter);
app.use("/api/cabinet", depCabinetRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/...",
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
