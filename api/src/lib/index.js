const express = require("express");
const { Router } = require("express");

// Routes
const authRouter = require("../routes/auth.routes");
const userRouter = require("../routes/user.routes");
const blogRouter = require("../routes/blog.routes");
const resultRouter = require("../routes/result.routes");

// Misc
const appLogger = require("../helpers/logger");

module.exports = {
  express,
  Router,
  authRouter,
  userRouter,
  blogRouter,
  resultRouter,
  appLogger,
};
