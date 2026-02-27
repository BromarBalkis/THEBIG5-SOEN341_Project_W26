const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const recipeController = require("../controllers/recipeController");

router.post("/", auth, recipeController.createRecipe);
router.get("/count", auth, recipeController.getRecipeCount);
router.get("/", auth, recipeController.getRecipes);
router.get("/:id", auth, recipeController.getRecipeById);
router.get("/", auth, recipeController.getRecipes);
router.get("/:id", auth, recipeController.getRecipeById);
router.put("/:id", auth, recipeController.updateRecipe);
router.delete("/:id", auth, recipeController.deleteRecipe);

module.exports = router;
console.log(recipeController);
