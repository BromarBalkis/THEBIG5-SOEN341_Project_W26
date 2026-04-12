// recipeController instantiates PrismaClient directly, so we mock the @prisma/client
// module itself and expose the shared mock instance via __mockInstance.
jest.mock("@prisma/client", () => {
  const mockInstance = {
    recipe: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockInstance), __mockInstance: mockInstance };
});

const { __mockInstance: prisma } = require("@prisma/client");
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipeCount,
} = require("../src/controllers/recipeController");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => jest.clearAllMocks());

// ── createRecipe ──────────────────────────────────────────────────────────────

describe("createRecipe", () => {
  test("creates a recipe and returns 201", async () => {
    const recipe = { id: "r1", title: "Pasta", userId: "u1" };
    prisma.recipe.create.mockResolvedValue(recipe);

    const req = {
      user: { userId: "u1" },
      body: {
        title: "Pasta",
        description: "desc",
        ingredients: [],
        steps: [],
        prepTime: 30,
        difficulty: "Easy",
        cost: 5,
        dietaryTags: [],
      },
    };
    const res = mockRes();

    await createRecipe(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(recipe);
  });

  test("returns 500 on database error", async () => {
    prisma.recipe.create.mockRejectedValue(new Error("db error"));
    const req = { user: { userId: "u1" }, body: {} };
    const res = mockRes();

    await createRecipe(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Failed to create recipe" });
  });
});

// ── getRecipes ────────────────────────────────────────────────────────────────

describe("getRecipes", () => {
  test("returns all recipes for the user", async () => {
    const recipes = [{ id: "r1" }, { id: "r2" }];
    prisma.recipe.findMany.mockResolvedValue(recipes);

    const req = { user: { userId: "u1" }, query: {} };
    const res = mockRes();

    await getRecipes(req, res);

    expect(prisma.recipe.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ userId: "u1" }) })
    );
    expect(res.json).toHaveBeenCalledWith(recipes);
  });

  test("applies difficulty filter", async () => {
    prisma.recipe.findMany.mockResolvedValue([]);
    const req = { user: { userId: "u1" }, query: { difficulty: "Easy" } };
    const res = mockRes();

    await getRecipes(req, res);

    expect(prisma.recipe.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ difficulty: "Easy" }) })
    );
  });

  test("applies maxTime filter as a number", async () => {
    prisma.recipe.findMany.mockResolvedValue([]);
    const req = { user: { userId: "u1" }, query: { maxTime: "45" } };
    const res = mockRes();

    await getRecipes(req, res);

    expect(prisma.recipe.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ prepTime: { lte: 45 } }) })
    );
  });
});

// ── getRecipeById ─────────────────────────────────────────────────────────────

describe("getRecipeById", () => {
  test("returns 404 when recipe does not exist", async () => {
    prisma.recipe.findUnique.mockResolvedValue(null);
    const req = { user: { userId: "u1" }, params: { id: "r1" } };
    const res = mockRes();

    await getRecipeById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Recipe not found" });
  });

  test("returns 403 when user does not own the recipe", async () => {
    prisma.recipe.findUnique.mockResolvedValue({ id: "r1", userId: "u2" });
    const req = { user: { userId: "u1" }, params: { id: "r1" } };
    const res = mockRes();

    await getRecipeById(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authorized" });
  });

  test("returns recipe when found and owned", async () => {
    const recipe = { id: "r1", userId: "u1", title: "Pasta" };
    prisma.recipe.findUnique.mockResolvedValue(recipe);
    const req = { user: { userId: "u1" }, params: { id: "r1" } };
    const res = mockRes();

    await getRecipeById(req, res);

    expect(res.json).toHaveBeenCalledWith(recipe);
  });
});

// ── updateRecipe ──────────────────────────────────────────────────────────────

describe("updateRecipe", () => {
  test("returns 404 when recipe does not exist", async () => {
    prisma.recipe.findUnique.mockResolvedValue(null);
    const req = { user: { userId: "u1" }, params: { id: "r1" }, body: {} };
    const res = mockRes();

    await updateRecipe(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Recipe not found" });
  });

  test("returns 403 when user does not own the recipe", async () => {
    prisma.recipe.findUnique.mockResolvedValue({ id: "r1", userId: "u2" });
    const req = { user: { userId: "u1" }, params: { id: "r1" }, body: {} };
    const res = mockRes();

    await updateRecipe(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authorized" });
  });

  test("updates and returns the recipe", async () => {
    prisma.recipe.findUnique.mockResolvedValue({ id: "r1", userId: "u1" });
    const updated = { id: "r1", userId: "u1", title: "New Title" };
    prisma.recipe.update.mockResolvedValue(updated);

    const req = {
      user: { userId: "u1" },
      params: { id: "r1" },
      body: { title: "New Title" },
    };
    const res = mockRes();

    await updateRecipe(req, res);

    expect(res.json).toHaveBeenCalledWith(updated);
  });
});

// ── deleteRecipe ──────────────────────────────────────────────────────────────

describe("deleteRecipe", () => {
  test("returns 404 when recipe does not exist", async () => {
    prisma.recipe.findUnique.mockResolvedValue(null);
    const req = { user: { userId: "u1" }, params: { id: "r1" } };
    const res = mockRes();

    await deleteRecipe(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Recipe not found" });
  });

  test("returns 403 when user does not own the recipe", async () => {
    prisma.recipe.findUnique.mockResolvedValue({ id: "r1", userId: "u2" });
    const req = { user: { userId: "u1" }, params: { id: "r1" } };
    const res = mockRes();

    await deleteRecipe(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authorized" });
  });

  test("deletes recipe and returns confirmation message", async () => {
    prisma.recipe.findUnique.mockResolvedValue({ id: "r1", userId: "u1" });
    prisma.recipe.delete.mockResolvedValue({});

    const req = { user: { userId: "u1" }, params: { id: "r1" } };
    const res = mockRes();

    await deleteRecipe(req, res);

    expect(prisma.recipe.delete).toHaveBeenCalledWith({ where: { id: "r1" } });
    expect(res.json).toHaveBeenCalledWith({ message: "Recipe deleted" });
  });
});

// ── getRecipeCount ────────────────────────────────────────────────────────────

describe("getRecipeCount", () => {
  test("returns the count of recipes for the user", async () => {
    prisma.recipe.count.mockResolvedValue(7);
    const req = { user: { userId: "u1" } };
    const res = mockRes();

    await getRecipeCount(req, res);

    expect(prisma.recipe.count).toHaveBeenCalledWith({ where: { userId: "u1" } });
    expect(res.json).toHaveBeenCalledWith({ count: 7 });
  });
});
