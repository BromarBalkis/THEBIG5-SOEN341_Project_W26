"use client";

import { useEffect, useState } from "react";

interface Recipe {
  id: string;
  title: string;
  description?: string;
  prepTime: number;
  difficulty: string;
  cost: number;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Recipes</h1>

      {recipes.length === 0 ? (
        <p>No recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">{recipe.title}</h2>
              <p>{recipe.description}</p>
              <p>⏱ {recipe.prepTime} mins</p>
              <p>🔥 {recipe.difficulty}</p>
              <p>💲 {recipe.cost}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
