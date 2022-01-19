const { Router } = require("express");
const { getLoggedInUser } = require("../controllers/result.controllers");

const router = Router();

router.get("/me", getLoggedInUser);

module.exports = router;
