"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [tag, setTag] = useState("");

  const fetchRecipes = async () => {
    const token = localStorage.getItem("token");

    const query = new URLSearchParams({
      search,
      difficulty,
      maxTime,
      maxCost,
      tag,
    }).toString();

    const res = await fetch(`http://localhost:5000/api/recipes?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Recipes</h1>

      {/* FILTER SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        <input
          placeholder="Search..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <input
          type="number"
          placeholder="Max Time"
          className="border p-2 rounded"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Cost"
          className="border p-2 rounded"
          value={maxCost}
          onChange={(e) => setMaxCost(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="">Dietary Tag</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Keto">Keto</option>
          <option value="Gluten-Free">Gluten-Free</option>
        </select>
      </div>

      {/* BUTTON SECTION */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={fetchRecipes}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>

        <button
          onClick={() => router.push("/recipes/create")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Recipe
        </button>
      </div>

      {/* RECIPE GRID */}
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{recipe.title}</h2>
              <p>{recipe.description}</p>
              <p>⏱ {recipe.prepTime} mins</p>
              <p>🔥 {recipe.difficulty}</p>
              <p>💲 {recipe.cost}</p>

              <div className="mt-3 flex gap-4">
                <Link
                  href={`/recipes/${recipe.id}/edit`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
