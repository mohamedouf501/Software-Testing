const { server } = require("../../app");
const mongoose = require("../../config/config");
const request = require("supertest");
const booksModel = require("../../src/api/resources/books/books.model");

afterAll(async () => {
  await booksModel.deleteMany({});
});
afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});

describe("get book", () => {
  it("description", async () => {
    const book = await booksModel.create({
      title: "Mybook",
    });
    const res = await request(server).get(`/api/books/${book._id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch("book retrieved successfully");
    expect(res.body.data.book).toMatchObject({ title: "Mybook" });
  });
  it("should 404 if book not found ", async () => {
    const res = await request(server).get(
      `/api/books/6390756a88d790d020478ed8`
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch("not found");
  });
  it("should 500 if  ", async () => {
    const res = await request(server).get(`/api/books/5`);
    expect(res.status).toBe(500);
    expect(res.body.message).toMatch("failed to get book");
  });
});

describe("update Book ", () => {
  it("should 404 if book not found ", async () => {
    const res = await request(server).put(
      `/api/books/6390756a88d790d020478ed8`
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch("not found");
  });

  it("should return  200 and update book ", async () => {
    const book = await booksModel.create({
      title: "Mybook",
    });
    const res = await request(server).put(`/api/books/${book._id}`).send({
      title: "MyBook Update",
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch("book updated successfully");
  });
});

describe("delete Book ", () => {
  it("should 404 if book not found ", async () => {
    const res = await request(server).put(
      `/api/books/6390756a88d790d020478ed8`
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch("not found");
  });

  it("should return  200 and delete book ", async () => {
    const book = await booksModel.create({
      title: "Mybook",
    });
    const res = await request(server).delete(`/api/books/${book._id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch("book deleted successfully");
  });
});
