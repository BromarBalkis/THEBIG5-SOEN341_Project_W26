const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getMealPlan = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { weekOf } = req.query;

    if (!weekOf) {
      return res.status(400).json({ message: "weekOf query param is required" });
    }

    const mealPlan = await prisma.mealPlan.findFirst({
      where: { userId, weekOf },
      include: { entries: true },
    });

    if (!mealPlan) {
      return res.json({ weekOf, entries: [] });
    }

    // Manually join recipe data (MongoDB Prisma doesn't support cross-collection include)
    const recipeIds = mealPlan.entries.map((e) => e.recipeId);
    const recipes = await prisma.recipe.findMany({
      where: { id: { in: recipeIds } },
    });

    const recipeMap = {};
    recipes.forEach((r) => {
      recipeMap[r.id] = r;
    });

    const entriesWithRecipes = mealPlan.entries.map((entry) => ({
      ...entry,
      recipe: recipeMap[entry.recipeId] || null,
    }));

    res.json({ ...mealPlan, entries: entriesWithRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch meal plan" });
  }
};

exports.addEntry = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { weekOf, recipeId, day, mealType } = req.body;

    if (!weekOf || !recipeId || !day || !mealType) {
      return res.status(400).json({ message: "weekOf, recipeId, day, and mealType are required" });
    }

    // Find or create the meal plan for this week
    let mealPlan = await prisma.mealPlan.findFirst({
      where: { userId, weekOf },
      include: { entries: true },
    });

    if (!mealPlan) {
      mealPlan = await prisma.mealPlan.create({
        data: { userId, weekOf },
        include: { entries: true },
      });
    }

    // Check for duplicate (same day + mealType slot)
    const duplicate = mealPlan.entries.find(
      (e) => e.day === day && e.mealType === mealType
    );

    if (duplicate) {
      return res.status(409).json({ message: "A meal is already assigned to this slot" });
    }

    // Verify the recipe belongs to this user
    const recipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
    if (!recipe || recipe.userId !== userId) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const entry = await prisma.mealPlanEntry.create({
      data: { mealPlanId: mealPlan.id, recipeId, day, mealType },
    });

    res.status(201).json({ ...entry, recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add meal plan entry" });
  }
};

exports.removeEntry = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { entryId } = req.params;

    const entry = await prisma.mealPlanEntry.findUnique({
      where: { id: entryId },
      include: { mealPlan: true },
    });

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    if (entry.mealPlan.userId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.mealPlanEntry.delete({ where: { id: entryId } });

    res.json({ message: "Entry removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove meal plan entry" });
  }
};
