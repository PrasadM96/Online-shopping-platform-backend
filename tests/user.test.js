const mongoose = require("mongoose");

const dbHandler = require("./db-handler");
const user = require("../controllers/user");

const mockRequest = (sessionData, body, user) => ({
  session: { data: sessionData },
  body,
  user,
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

/**
 * Unit testing for login function
 */
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
/**
 * Unit testing for register function
 */
describe("register", () => {
  test("should 400 if first name is missing from body", async () => {
    const req = mockRequest({}, { first_name: "boss" });
    const res = mockResponse();
    await user.Register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Please enter all fields",
    });
  });
  test("should 400 if last name is missing from body", async () => {
    const req = mockRequest({}, { last_name: "boss" });
    const res = mockResponse();
    await user.Register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Please enter all fields",
    });
  });
  test("should 400 if email is missing from body", async () => {
    const req = mockRequest({}, { email: "boss@gmail.com" });
    const res = mockResponse();
    await user.Register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Please enter all fields",
    });
  });
  test("should 400 if password is missing from body", async () => {
    const req = mockRequest({}, { password: "boss" });
    const res = mockResponse();
    await user.Register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Please enter all fields",
    });
  });

});
