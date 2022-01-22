const { Router } = require("express");
const {
  login,
  register,
  refreshToken,
  logout,
} = require("../controllers/auth.controllers");

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
router.post("/login", login);

router.post("/register", register);
router.post("/refresh-token", refreshToken);
router.delete("/logout", logout);

module.exports = router;
