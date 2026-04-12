// mealPlanController instantiates PrismaClient directly, so we mock @prisma/client
// and expose the shared mock instance via __mockInstance.
jest.mock("@prisma/client", () => {
  const mockInstance = {
    mealPlan: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    mealPlanEntry: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    recipe: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockInstance), __mockInstance: mockInstance };
});

const { __mockInstance: prisma } = require("@prisma/client");
const { getMealPlan, addEntry, removeEntry } = require("../src/controllers/mealPlanController");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => jest.clearAllMocks());

// ── getMealPlan ───────────────────────────────────────────────────────────────

describe("getMealPlan", () => {
  test("returns 400 when weekOf query param is missing", async () => {
    const req = { user: { userId: "u1" }, query: {} };
    const res = mockRes();

    await getMealPlan(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "weekOf query param is required" });
  });

  test("returns empty entries when no plan exists for that week", async () => {
    prisma.mealPlan.findFirst.mockResolvedValue(null);
    const req = { user: { userId: "u1" }, query: { weekOf: "2026-04-07" } };
    const res = mockRes();

    await getMealPlan(req, res);

    expect(res.json).toHaveBeenCalledWith({ weekOf: "2026-04-07", entries: [] });
  });

  test("returns entries with joined recipe data", async () => {
    const entry = { id: "e1", recipeId: "r1", day: "Monday", mealType: "Lunch" };
    const recipe = { id: "r1", title: "Pasta", userId: "u1" };

    prisma.mealPlan.findFirst.mockResolvedValue({
      id: "mp1",
      weekOf: "2026-04-07",
      entries: [entry],
    });
    prisma.recipe.findMany.mockResolvedValue([recipe]);

    const req = { user: { userId: "u1" }, query: { weekOf: "2026-04-07" } };
    const res = mockRes();

    await getMealPlan(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        entries: [{ ...entry, recipe }],
      })
    );
  });
});

// ── addEntry ──────────────────────────────────────────────────────────────────

describe("addEntry", () => {
  test("returns 400 when required body fields are missing", async () => {
    const req = { user: { userId: "u1" }, body: { weekOf: "2026-04-07" } };
    const res = mockRes();

    await addEntry(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "weekOf, recipeId, day, and mealType are required",
    });
  });

  test("returns 409 when the day/mealType slot is already occupied", async () => {
    prisma.mealPlan.findFirst.mockResolvedValue({
      id: "mp1",
      entries: [{ id: "e1", day: "Monday", mealType: "Lunch" }],
    });

    const req = {
      user: { userId: "u1" },
      body: { weekOf: "2026-04-07", recipeId: "r1", day: "Monday", mealType: "Lunch" },
    };
    const res = mockRes();

    await addEntry(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "A meal is already assigned to this slot",
    });
  });

  test("returns 404 when recipe does not exist or is not owned by user", async () => {
    prisma.mealPlan.findFirst.mockResolvedValue({ id: "mp1", entries: [] });
    prisma.recipe.findUnique.mockResolvedValue(null);

    const req = {
      user: { userId: "u1" },
      body: { weekOf: "2026-04-07", recipeId: "r1", day: "Monday", mealType: "Lunch" },
    };
    const res = mockRes();

    await addEntry(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Recipe not found" });
  });

  test("returns 404 when recipe belongs to a different user", async () => {
    prisma.mealPlan.findFirst.mockResolvedValue({ id: "mp1", entries: [] });
    prisma.recipe.findUnique.mockResolvedValue({ id: "r1", userId: "u2" });

    const req = {
      user: { userId: "u1" },
      body: { weekOf: "2026-04-07", recipeId: "r1", day: "Monday", mealType: "Lunch" },
    };
    const res = mockRes();

    await addEntry(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("creates entry and returns 201 with joined recipe", async () => {
    const recipe = { id: "r1", userId: "u1", title: "Pasta" };
    const entry = { id: "e1", mealPlanId: "mp1", recipeId: "r1", day: "Monday", mealType: "Lunch" };

    prisma.mealPlan.findFirst.mockResolvedValue({ id: "mp1", entries: [] });
    prisma.recipe.findUnique.mockResolvedValue(recipe);
    prisma.mealPlanEntry.create.mockResolvedValue(entry);

    const req = {
      user: { userId: "u1" },
      body: { weekOf: "2026-04-07", recipeId: "r1", day: "Monday", mealType: "Lunch" },
    };
    const res = mockRes();

    await addEntry(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ ...entry, recipe });
  });

  test("creates the meal plan first when none exists for that week", async () => {
    const recipe = { id: "r1", userId: "u1", title: "Pasta" };
    const entry = { id: "e1", mealPlanId: "mp1", recipeId: "r1", day: "Tuesday", mealType: "Dinner" };

    prisma.mealPlan.findFirst.mockResolvedValue(null);
    prisma.mealPlan.create.mockResolvedValue({ id: "mp1", entries: [] });
    prisma.recipe.findUnique.mockResolvedValue(recipe);
    prisma.mealPlanEntry.create.mockResolvedValue(entry);

    const req = {
      user: { userId: "u1" },
      body: { weekOf: "2026-04-07", recipeId: "r1", day: "Tuesday", mealType: "Dinner" },
    };
    const res = mockRes();

    await addEntry(req, res);

    expect(prisma.mealPlan.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: { userId: "u1", weekOf: "2026-04-07" } })
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

// ── removeEntry ───────────────────────────────────────────────────────────────

describe("removeEntry", () => {
  test("returns 404 when entry does not exist", async () => {
    prisma.mealPlanEntry.findUnique.mockResolvedValue(null);
    const req = { user: { userId: "u1" }, params: { entryId: "e1" } };
    const res = mockRes();

    await removeEntry(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Entry not found" });
  });

  test("returns 403 when user does not own the meal plan", async () => {
    prisma.mealPlanEntry.findUnique.mockResolvedValue({
      id: "e1",
      mealPlan: { userId: "u2" },
    });
    const req = { user: { userId: "u1" }, params: { entryId: "e1" } };
    const res = mockRes();

    await removeEntry(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authorized" });
  });

  test("deletes entry and returns confirmation message", async () => {
    prisma.mealPlanEntry.findUnique.mockResolvedValue({
      id: "e1",
      mealPlan: { userId: "u1" },
    });
    prisma.mealPlanEntry.delete.mockResolvedValue({});

    const req = { user: { userId: "u1" }, params: { entryId: "e1" } };
    const res = mockRes();

    await removeEntry(req, res);

    expect(prisma.mealPlanEntry.delete).toHaveBeenCalledWith({ where: { id: "e1" } });
    expect(res.json).toHaveBeenCalledWith({ message: "Entry removed" });
  });
});
