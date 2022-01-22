const redis = require("redis");

const redisClient = redis.createClient({ url: process.env.REDIS_URL });

redisClient.on("connect", () => {
  console.log("Redis connected");
});

redisClient.on("error", (error) => {
  console.log("Error in connecting to the redis");
  console.log({ error: error.message });
});

redisClient.on("end", () => {
  console.log("Disconnected from redis");
});

process.on("SIGINT", () => {
  redisClient.quit();
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log({ error: error.message });
  }
};

module.exports = { redisClient, connectRedis };
