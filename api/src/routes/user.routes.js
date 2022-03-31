const { Router } = require("express");
const {
  getLoggedInUser,
  updateProfile,
  checkIfUsernameAvailable,
  getAUser,
} = require("../controllers/user.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = Router();

router.get("/me", authMiddleware, getLoggedInUser);
router.get("/:id", authMiddleware, getAUser);
router.get("/username", checkIfUsernameAvailable);
router.put("/update-profile", authMiddleware, updateProfile);

module.exports = router;
