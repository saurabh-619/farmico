const User = require("../models/User.model");
const createError = require("http-errors");

const { registerSchema, loginSchema } = require("../utils/validation.schema");
const {
  signAccessToken,
  signRefreshToken,
  setCookies,
  verifyRefreshToken,
} = require("../helpers/tokens");
const { redisClient } = require("../helpers/redis");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = await loginSchema.validateAsync(req.body);

    //   Check if already exists
    const user = await User.findOne({ email });

    if (!user) {
      throw new createError.NotFound("Requested user doesn't exist");
    }

    // Check password
    const isCorrect = await user.isPasswordCorrect(password);
    if (!isCorrect) {
      throw new createError.Unauthorized("Email or Password is incorrect.");
    }

    // User seems valid
    //   genearate tokens and send them to user
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    // Set cookies
    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } =
      await registerSchema.validateAsync(req.body);

    //   Check if already exists
    const doesEmailExists = await User.findOne({ email });
    const doesUsernameExists = await User.findOne({ username });

    if (doesEmailExists) {
      throw new createError.Conflict(
        "Email already exists. Please use with another one."
      );
    }
    if (doesUsernameExists) {
      throw new createError.Conflict(
        "Username already taken. Please try another one."
      );
    }

    const newUser = new User({ name, username, email, password });

    //   genearate tokens and send them to user
    const accessToken = await signAccessToken(newUser.id);
    const refreshToken = await signRefreshToken(newUser.id);

    await newUser.save();

    // Set cookies
    setCookies(res, accessToken, refreshToken);

    return res.status(201).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      throw new createError.BadRequest("Refresh token not provided");

    const userId = await verifyRefreshToken(refreshToken); //   genearate tokens and send them to user
    const newAccessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);
    // Set cookies
    setCookies(res, newAccessToken, newRefreshToken);

    res.status(201).json({
      newAccessToken,
      newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      throw new createError.BadRequest("Refresh token not provided");

    const userId = await verifyRefreshToken(refreshToken);

    const val = await redisClient.DEL(userId);
    console.log({ msg: `[logout] user - ${userId} => `, val });

    res.status(204);
  } catch (error) {
    next(error);
  }
};
