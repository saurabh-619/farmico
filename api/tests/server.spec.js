const { app, server } = require("../src/index");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { redisClient } = require("../src/helpers/redis");
const requestWithSupertest = supertest(app);

describe("User routes", () => {
  afterAll(() => {
    server.close();
    mongoose.connection.close();
    redisClient.quit();
  });

  it("'GET /' should give home page of API", async () => {
    const res = await requestWithSupertest.get("/");
    expect(res.status).toBe(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("msg");
  });
});
