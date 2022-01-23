const compression = require("compression");
const rateLimit = require("express-rate-limit");
const swaggerJsdoc = require("swagger-jsdoc");

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

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Farmico's Community API",
      version: "0.1.0",
      description:
        "This is a production API of the application Farmico made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Farmico",
        url: "https://" + process.env.CLIENT_DOMAIN,
        email: "projecttracker.web@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/**.js"], // always use absolute path
};

exports.specs = swaggerJsdoc(swaggerOptions);
