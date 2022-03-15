const { Router } = require("express");
const {
  getLoggedInUser,
  updateProfile,
  checkIfUsernameAvailable,
} = require("../controllers/user.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = Router();

router.get("/me", authMiddleware, getLoggedInUser);
router.get("/username", checkIfUsernameAvailable);
router.put("/update-profile", authMiddleware, updateProfile);

module.exports = router;
