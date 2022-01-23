const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { redisClient } = require("./redis");
const { __dev__ } = require("../utils/constants");

const ACCESS_TOKEN_EXPIRATION = 25 * 60; // sec (JWT)
const ACCESS_TOKEN_EXPIRATION_COOKIE = 25 * 1000 * 60; //milli-sec
const REFRESH_TOKEN_EXPIRATION = 15 * 60; // sec (JWT)
const REFRESH_TOKEN_EXPIRATION_REDIS_AND_COOKIE = 15 * 60 * 1000; //milli-sec

exports.signAccessToken = async (userId) => {
  const payload = {
    userId,
  };
  const options = {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
    issuer: process.env.CLIENT_DOMAIN,
    audience: userId.toString(),
  };

  try {
    const accessToken = JWT.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      options
    );
    return accessToken;
  } catch (error) {
    console.log({ error: error.message });
    throw new createError.InternalServerError();
  }
};

exports.signRefreshToken = async (userId) => {
  const payload = {
    userId,
  };
  const options = {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
    issuer: process.env.CLIENT_DOMAIN,
    audience: userId.toString(),
  };

  try {
    const refreshToken = JWT.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      options
    );

    // Store refresh token in redis
    await redisClient.SET(userId, refreshToken, {
      EX: REFRESH_TOKEN_EXPIRATION_REDIS_AND_COOKIE,
    });

    return refreshToken;
  } catch (error) {
    console.log({ error: error.message });
    throw new createError.InternalServerError();
  }
};

exports.verifyRefreshToken = async (refreshToken) => {
  try {
    // Check if token is valid according to the secret
    const payload = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!payload.aud)
      throw new createError.Unauthorized(
        "Please log in again. Refresh token is malformed"
      );
    const userId = payload.aud;

    // Check if token is valid according to the redis (if its the same token we had assigned)
    const storedRefreshToken = await redisClient.GET(userId);

    if (storedRefreshToken !== refreshToken) {
      throw new createError.Unauthorized(
        "Please log in again. Refresh token is malformed"
      );
    }

    return userId;
  } catch (error) {
    console.log({ error: error.message });
    throw new createError.InternalServerError();
  }
};

exports.setCookies = async (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    secure: !__dev__,
    httpOnly: true,
    maxAge: ACCESS_TOKEN_EXPIRATION_COOKIE,
    domain: "127.0.0.1",
  });
  res.cookie("refreshToken", refreshToken, {
    secure: !__dev__,
    httpOnly: true,
    maxAge: REFRESH_TOKEN_EXPIRATION_REDIS_AND_COOKIE,
    domain: "127.0.0.1",
  });
};