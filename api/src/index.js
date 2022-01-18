const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const createErrors = require("http-errors");

const { compressionConfig, globalRateLimiter } = require("./utils/config");
const appLogger = require("./helpers/logger");

const app = express();

// configs
require("dotenv").config();
require("./helpers/db");

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(compression(compressionConfig));
app.use(globalRateLimiter);

// Routes
app.get("/", (_, res) => {
  return res.json({
    success: true,
    msg: "Welcome to the Farmico's API",
  });
});

app.use(async (_, __, next) => {
  next(new createErrors.NotFound("Requested route does not exit."));
});

app.use((error, _, res, next) => {
  appLogger.error(error.message);
  res.status(error.status || 500).json({
    status: error.status || 500,
    error: error.message,
  });
  next();
});

// Listen
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running on port " + port + "🚀");
  appLogger.info("Server running on port " + port + "🚀");
});
