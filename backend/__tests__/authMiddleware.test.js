jest.mock("jsonwebtoken");

const jwt = require("jsonwebtoken");
const authMiddleware = require("../src/middleware/auth");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
  process.env.JWT_SECRET = "test-secret";
});

describe("auth middleware", () => {
  test("returns 401 when no authorization header", () => {
    const req = { headers: {} };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 when header does not start with Bearer", () => {
    const req = { headers: { authorization: "Basic sometoken" } };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  test("calls next and sets req.user on a valid token", () => {
    const decoded = { userId: "u1", email: "test@test.com" };
    jwt.verify.mockReturnValue(decoded);

    const req = { headers: { authorization: "Bearer validtoken" } };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("validtoken", "test-secret");
    expect(req.user).toEqual(decoded);
    expect(next).toHaveBeenCalled();
  });

  test("returns 401 when token verification throws", () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid signature");
    });

    const req = { headers: { authorization: "Bearer badtoken" } };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid token" });
    expect(next).not.toHaveBeenCalled();
  });
});
