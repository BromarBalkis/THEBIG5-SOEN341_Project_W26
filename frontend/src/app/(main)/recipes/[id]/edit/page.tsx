"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Recipe {
  id: string;
  title: string;
  description?: string;
  prepTime: number;
  difficulty: string;
  cost: number;
  nutritionCalories?: number | null;
  nutritionProtein?: number | null;
  nutritionCarbs?: number | null;
  nutritionFat?: number | null;
}

export default function EditRecipePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        alert("Failed to fetch recipe");
        router.push("/recipes");
        return;
      }

      const data = await res.json();
      setRecipe(data);
      setLoading(false);
    };

    if (id) {
      fetchRecipe();
    }
  }, [id, router]);

  const numericFields = ["prepTime", "cost", "nutritionCalories", "nutritionProtein", "nutritionCarbs", "nutritionFat"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!recipe) return;

    const { name, value } = e.target;

    setRecipe({
      ...recipe,
      [name]: numericFields.includes(name) ? (value === "" ? null : Number(value)) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipe),
    });

    if (res.ok) {
      router.push("/recipes");
    } else {
      alert("Failed to update recipe");
    }
  };

  if (loading || !recipe) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={recipe.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="description"
          value={recipe.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="prepTime"
          value={recipe.prepTime}
          onChange={handleChange}
          placeholder="Prep Time"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="difficulty"
          value={recipe.difficulty}
          onChange={handleChange}
          placeholder="Difficulty"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="cost"
          value={recipe.cost}
          onChange={handleChange}
          placeholder="Cost"
          className="w-full border p-2 rounded"
        />

        <div className="pt-2">
          <p className="text-sm font-semibold text-gray-600 mb-2">Nutrition (optional)</p>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              name="nutritionCalories"
              value={recipe.nutritionCalories ?? ""}
              onChange={handleChange}
              placeholder="Calories (kcal)"
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="nutritionProtein"
              value={recipe.nutritionProtein ?? ""}
              onChange={handleChange}
              placeholder="Protein (g)"
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="nutritionCarbs"
              value={recipe.nutritionCarbs ?? ""}
              onChange={handleChange}
              placeholder="Carbs (g)"
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="nutritionFat"
              value={recipe.nutritionFat ?? ""}
              onChange={handleChange}
              placeholder="Fat (g)"
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
