const { app } = require("../src/index");
const supertest = require("supertest");
const requestWithSupertest = supertest(app);

describe("User routes", () => {
  it("'GET /' should give home page of API", async () => {
    const res = await requestWithSupertest.get("/");
    expect(res.status).toBe(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("msg");
  });
});
