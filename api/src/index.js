const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const createErrors = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const { version } = require("../package.json");

const {
  compressionConfig,
  globalRateLimiter,
  specs,
} = require("./utils/config");
const appLogger = require("./helpers/logger");
const { authRouter, userRouter, blogRouter, resultRouter } = require("./lib");
const { authMiddleware } = require("./middlewares/auth.middleware");
const { __isTesting__ } = require("./utils/constants");

const app = express();

// configs
require("dotenv").config();
require("./helpers/db");
require("./helpers/redis").connectRedis();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression(compressionConfig));
app.use(globalRateLimiter);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
  })
);

app.get("/", (_, res) => {
  return res.json({
    success: true,
    msg: `Welcome to the Farmico's API v${version} [${process.env.NODE_ENV}]`,
  });
});

app.get("/team", authMiddleware, (_, res) => {
  return res.json([
    {
      name: "Saurabh Anand Bomble",
    },
    {
      name: "Onkar Namdeo Gaikar",
    },
    {
      name: "Bhavansh Manoj Gupta",
    },
    {
      name: "Shubham Sanjay Chalekar",
    },
  ]);
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/blogs", blogRouter);
app.use("/results", resultRouter);

// Fallback Route modules
app.use(async (_, __, next) => {
  next(new createErrors.NotFound("Requested route does not exit."));
});

app.use((error, _, res, next) => {
  appLogger.error(error.message);
  res.status(error.status || 500).json({
    ok: false,
    status: error.status || 500,
    error: error.message,
  });
  next();
});

// Listen
const port = process.env.PORT;
const server = app.listen(port, () => {
  !__isTesting__ && console.log("Server running on port " + port + "🚀");
  appLogger.info("Server running on port " + port + "🚀");
});

module.exports = { app, server };
