const { Router } = require("express");
const router = Router();

const {
  getResults,
  postResult,
  getResult,
  deleteResult,
} = require("../controllers/result.controllers");

router.route("/").get(getResults).post(postResult);
router.route("/:id").get(getResult).delete(deleteResult);

module.exports = router;
