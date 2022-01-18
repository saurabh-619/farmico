const compression = require("compression");
const rateLimit = require("express-rate-limit");

exports.compressionConfig = {
  threshold: 2 * 1000,
  level: 6,
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) return false;
    return compression.filter(req, res);
  },
};

exports.globalRateLimiter = rateLimit({
  windowMs: 15 * 1000 * 60,
  max: 50, // handle only 50 requests for every 15 min from an IP
  message: "Too many requests, wait for some time",
  standardHeaders: true,
  legacyHeaders: false,
});
