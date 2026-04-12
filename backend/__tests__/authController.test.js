jest.mock("../src/db/prisma", () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const prisma = require("../src/db/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { register, login } = require("../src/controllers/authController");

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

describe("register", () => {
  test("returns 400 when required fields are missing", async () => {
    const req = { body: { email: "a@b.com" } };
    const res = mockRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "All fields are required" });
  });

  test("returns 400 when password is shorter than 6 characters", async () => {
    const req = { body: { fullName: "Alice", username: "alice", email: "a@b.com", password: "abc" } };
    const res = mockRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Password must be at least 6 characters" });
  });

  test("returns 409 when email is already registered", async () => {
    prisma.user.findUnique.mockResolvedValue({ id: "u1", email: "a@b.com" });
    const req = { body: { fullName: "Alice", username: "alice", email: "a@b.com", password: "secret123" } };
    const res = mockRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: "Email already exists" });
  });

  test("creates user and returns 201 on success", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashed");
    prisma.user.create.mockResolvedValue({
      id: "u1",
      email: "a@b.com",
      fullName: "Alice",
      username: "alice",
    });

    const req = { body: { fullName: "Alice", username: "alice", email: "a@b.com", password: "secret123" } };
    const res = mockRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: "u1",
      email: "a@b.com",
      fullName: "Alice",
      username: "alice",
    });
  });
});

describe("login", () => {
  test("returns 400 when email or password is missing", async () => {
    const req = { body: { email: "a@b.com" } };
    const res = mockRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email and password are required" });
  });

  test("returns 401 when user is not found", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const req = { body: { email: "a@b.com", password: "secret123" } };
    const res = mockRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
  });

  test("returns 401 when password does not match", async () => {
    prisma.user.findUnique.mockResolvedValue({ id: "u1", email: "a@b.com", passwordHash: "hash" });
    bcrypt.compare.mockResolvedValue(false);
    const req = { body: { email: "a@b.com", password: "wrongpw" } };
    const res = mockRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
  });

  test("returns token on successful login", async () => {
    prisma.user.findUnique.mockResolvedValue({ id: "u1", email: "a@b.com", passwordHash: "hash" });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mytoken");
    const req = { body: { email: "a@b.com", password: "secret123" } };
    const res = mockRes();

    await login(req, res);

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: "u1", email: "a@b.com" },
      "test-secret",
      { expiresIn: "2h" }
    );
    expect(res.json).toHaveBeenCalledWith({ message: "Logged in", token: "mytoken" });
  });
});
