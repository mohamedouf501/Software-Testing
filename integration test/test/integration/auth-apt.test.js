const { server } = require("../../app");
const mongoose = require("../../config/config");
const request = require("supertest");

describe("register", () => {
  it("should return 400 if any field is missing", async () => {
    const emailRes = await request(server).post("/api/auth/registration");
    expect(emailRes.status).toBe(400);
    expect(emailRes.body.message).toMatch("email is required");

    const passwordRes = await request(server)
      .post("/api/auth/registration")
      .send({
        email: "test@test.com",
      });
    expect(passwordRes.body.message).toMatch("password is required");
    expect(passwordRes.status).toBe(400);
  });

  it("should return 400 if password < 8 chars", async () => {
    const passwordRes = await request(server)
      .post("/api/auth/registration")
      .send({
        email: "test@test.com",
        password: "5252",
        confirmPassword: "5252",
      });
    expect(passwordRes.body.message).toMatch(
      "password must be at least 8 chars"
    );
    expect(passwordRes.status).toBe(400);
  });

  it("should return 400 if confirm dose not match password ", async () => {
    const Res = await request(server).post("/api/auth/registration").send({
      email: "test@test.com",
      password: "52522536",
      confirmPassword: "5252",
    });
    expect(Res.body.message).toMatch("confirm dose not match password");
    expect(Res.status).toBe(400);
  });

  it("should return 200 and register user  ", async () => {
    const Res = await request(server).post("/api/auth/registration").send({
      email: "test@test.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(Res.body.message).toMatch("register successfully");
    expect(Res.status).toBe(200);
  });
});
