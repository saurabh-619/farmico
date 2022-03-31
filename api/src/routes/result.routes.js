const { Router } = require("express");
const router = Router();

const {
  getResults,
  postResult,
  getResult,
  deleteResult,
} = require("../controllers/result.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");

router
  .route("/")
  .get(authMiddleware, getResults)
  .post(authMiddleware, postResult);

router
  .route("/:id")
  // .get(authMiddleware, getResult)
  .get(getResult)
  .delete(authMiddleware, deleteResult);

module.exports = router;
