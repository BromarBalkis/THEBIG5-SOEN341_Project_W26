import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { createRecipe } from "../lib/api";

export default function RecipeNew() {
  const nav = useNavigate();

  return (
    <RecipeForm
      submitLabel="Create Recipe"
      initial={{
        title: "",
        ingredients: [],
        steps: "",
        prepTimeMin: 0,
        difficulty: "EASY",
        cost: 0,
        dietaryTags: [],
      }}
      onSubmit={async (data) => {
        await createRecipe(data as any);
        nav("/home/recipes", { replace: true }); // correct route
      }}
    />
  );
}