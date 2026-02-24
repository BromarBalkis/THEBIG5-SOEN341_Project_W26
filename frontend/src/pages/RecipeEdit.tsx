import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { getRecipe, updateRecipe, Recipe } from "../lib/api";

export default function RecipeEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [initial, setInitial] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const r: Recipe = await getRecipe(id!);
      setInitial({
        title: r.title,
        ingredients: r.ingredients,
        steps: r.steps,
        prepTimeMin: r.prepTimeMin,
        difficulty: r.difficulty,
        cost: r.cost,
        dietaryTags: r.dietaryTags,
        createdById: "" as any,
      });
    })();
  }, [id]);

  if (!initial) return <div className="card"><div className="status">Loading...</div></div>;

  return (
    <RecipeForm
      submitLabel="Save Changes"
      initial={initial}
      onSubmit={async (data) => {
        const { createdById, ...body } = data as any;
        await updateRecipe(id!, body);
        nav("/recipes", { replace: true });
      }}
    />
  );
}