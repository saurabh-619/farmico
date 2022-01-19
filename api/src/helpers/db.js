const { mongoose, appLogger } = require("../lib/index");

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Mongo db connected");
  })
  .catch((error) => {
    console.log({ error: error.message });
    appLogger.error(error.message);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});

mongoose.connection.on("error", (error) => {
  console.log({ error: error.message });
  appLogger.error(error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close();
  process.exit(0);
});
