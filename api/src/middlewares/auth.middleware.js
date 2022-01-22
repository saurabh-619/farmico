const createError = require("http-errors");
const JWT = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken)
      throw new createError.Unauthorized(
        "Access token couldn't found. Issue a new token, Or log in again"
      );
    const payload = JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const userId = payload.aud;
    if (!userId) {
      throw new createError.Unauthorized(
        "Access token has expired. Issue a new token, Or log in again"
      );
    }
    req.payload = payload;
    next();
  } catch (error) {
    console.log({ error: error.message });
    error.message =
      "Access token has expired. Issue a new token, Or log in again";
    next(error);
  }
};
