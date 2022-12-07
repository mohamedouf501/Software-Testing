const {
  sum,
  greeting,
  isEven,
  Anmimls,
  getOrderById,
  getOrders,
  applyDiscount,
} = require("./uilts");
const db = require("./db");

describe("sum", () => {
  it("sum - should return 2+3 = 5  ", () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
  });
});

describe("isEven", () => {
  it("should return true for 4 ", () => {
    expect(isEven(4)).toBeTruthy();
  });

  it(" should return true for 4 ", () => {
    expect(isEven(7)).toBeFalsy();
  });
});

test("greeting-should return hello mohamed ", () => {
  expect(greeting("MOHAMED")).toMatch(/MOHAMED/);
});

describe("validation", () => {
  it("", () => {
    let x = 2;
    expect(x).not.toBeUndefined();
  });
});

describe("Anmimls", () => {
  it("should return true for cat", () => {
    expect(Anmimls).toContain("cat");
  });
});

describe("getOrderById", () => {
  it("should return Order of  Id = 1", () => {
    const result = getOrderById(1);
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });

  it("should throw error  if id is not defined", () => {
    expect(() => getOrderById()).toThrow();
  });
});

describe("getOrder", () => {
  it("should return some orders", async () => {
    // expect((await getOrders()).length).toBe(2);
    await expect(getOrders()).resolves.toContainEqual({ id: 1, price: 10 });
  });
});

describe("applyDiscount", () => {
  it("should applyDiscount 10% for order price 10", () => {
    db.getOrder = jest.fn().mockReturnValue({ id: 1, price: 10 });

    const order = applyDiscount(1);
    expect(order).toEqual({ id: 1, price: 9 });
    db.getOrder.mockReset();
  });
});

applyDiscount;
