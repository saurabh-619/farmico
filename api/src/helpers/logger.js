const { transports, createLogger, format } = require("winston");
const { combine, timestamp, printf } = format;
const { __dev__ } = require("./../utils/constants");

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${level}]: ${message}  =======>  ${timestamp}) --- ${new Date(
    timestamp
  ).toLocaleTimeString()} ${new Date(timestamp).toDateString()}`;
});

const appLogger = createLogger({
  format: combine(timestamp(), myFormat),
  defaultMeta: "user-service",
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "all.log" }),
  ],
});

if (__dev__) {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

module.exports = appLogger;
