const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createRecipe = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      title,
      description,
      ingredients,
      steps,
      prepTime,
      difficulty,
      cost,
      dietaryTags,
    } = req.body;

    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        ingredients,
        steps,
        prepTime,
        difficulty,
        cost,
        dietaryTags,
        userId,
      },
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create recipe" });
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const userId = req.user.userId;

    const recipes = await prisma.recipe.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
};
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: req.params.id },
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipe" });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const updated = await prisma.recipe.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update recipe" });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    await prisma.recipe.delete({
      where: { id: req.params.id },
    });

    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete recipe" });
  }
};
