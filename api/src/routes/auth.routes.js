const { Router } = require("express");
const {
  login,
  register,
  refreshToken,
  logout,
} = require("../controllers/auth.controllers");

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/refresh-token", refreshToken);
router.delete("/logout", logout);

module.exports = router;
