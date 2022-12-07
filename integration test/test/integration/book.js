const booksService = require("../../src/api/resources/books/books.service");
const booksModel = require("../../src/api/resources/books/books.model");
const { server } = require("../../app");
const { default: mongoose } = require("mongoose");
require("../../config/config");

beforeEach(async () => {
  await booksModel.deleteMany({});
});
afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});
describe("get book", () => {
  it("should return empty array", async () => {
    const books = await booksService.getBooks();
    expect(books.length).toBe(0);
  });

  it('"should return  2 books', async () => {
    await booksModel.insertMany([
      {
        title: "book1",
      },
      {
        title: "book2",
      },
    ]);

    const books = await booksService.getBooks();

    expect(books.length).toBe(2);
    expect(books[0]).toMatchObject({ title: "book1" });
  });
});

describe("Create book", () => {
  it("should create book with title java", async () => {
    await booksService.createBook({
      title: "java",
    });
    const books = await booksModel.find({});
    expect(books[0]).toMatchObject({ title: "java" });
  });
});
