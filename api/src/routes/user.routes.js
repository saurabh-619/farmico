const { Router } = require("express");
const {
  getLoggedInUser,
  updateProfile,
} = require("../controllers/user.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = Router();

router.get("/me", authMiddleware, getLoggedInUser);
router.post("/update-profile", authMiddleware, updateProfile);

module.exports = router;
