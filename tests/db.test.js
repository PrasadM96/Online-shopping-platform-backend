const mongoose = require("mongoose");

const dbHandler = require("./db-handler");
const user = require("../controllers/user");
const order = require("../controllers/orders");
const seller = require("../controllers/seller");
const { ObjectID } = require("mongodb");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());
beforeEach(() => jest.clearAllMocks());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe("product ", () => {
  it("can be created correctly", async () => {
    expect(async () => await user.create(productComplete)).not.toThrow();
  });
});

/**
 * Complete product example.
 */
const productComplete = {
  title: "Fashion 1",
  category: "Fashion",
  subCategory: "Watches",
  condition: "New",
  description: "sdad",
  sellingArea: "Europe",
  quantity: 6,
  price: 699,
  shippingFee: 2,
  imageUrls: [
    "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  ],
  userId: "5e89116d64547e20500fba3a",
};

describe("orders", () => {
  it("can be created correctly", async () => {
    expect(async () => await order.create(orderComplete)).not.toThrow();
  });
});

/**
 * Complete order example.
 */
const orderComplete = [
  {
    user: {
      userId: "5e89116d64547e20500fba3a",
      details: {
        firstname: "abc",
        lastname: "test",
        country: "sl",
        province: "sa",
        zipCode: 1245,
        teleNumber: "047857845",
      },
    },
    items: [{ productId: new ObjectID(), quantity: 5 }],
    totalPrice: 55,
  },
];

describe("seller", () => {
  it("can be created correctly", async () => {
    expect(async () => await seller.create(sellerComplete)).not.toThrow();
  });
});

/**
 * Complete seller example.
 */

sellerComplete = {
  name: "test",
  address: "asdf",
  city: "test",
  zip: 4758,
  state: "ca",
  country: "sl",
};
