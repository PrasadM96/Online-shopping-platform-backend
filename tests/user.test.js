const mongoose = require("mongoose");

const dbHandler = require("./db-handler");
const user = require("../controllers/user");

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

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

describe("login", () => {
  test("should 400 if email is missing from body", async () => {
    const req = mockRequest({}, { password: "boss" });
    const res = mockResponse();
    await user.Login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Please enter all fields",
    });
  });
  test("should 400 if password is missing from body", async () => {
    const req = mockRequest({}, { email: "abc@gmail.com" });
    const res = mockResponse();
    await user.Login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Please enter all fields",
    });
  });
});

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
