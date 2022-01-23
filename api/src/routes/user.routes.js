const { Router } = require("express");
const {
  getLoggedInUser,
  updateProfile,
} = require("../controllers/user.controllers");

const router = Router();

router.get("/me", getLoggedInUser);
router.post("/update-profile", updateProfile);

module.exports = router;
