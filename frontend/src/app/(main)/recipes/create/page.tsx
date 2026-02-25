"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRecipePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    prepTime: "",
    difficulty: "",
    cost: "",
    dietaryTags: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        ingredients: form.ingredients.split(",").map((i) => i.trim()),
        steps: form.steps.split(",").map((s) => s.trim()),
        prepTime: Number(form.prepTime),
        difficulty: form.difficulty,
        cost: Number(form.cost),
        dietaryTags: form.dietaryTags.split(",").map((d) => d.trim()),
      }),
    });

    if (res.ok) {
      router.push("/recipes");
    } else {
      alert("Failed to create recipe");
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="steps"
          placeholder="Steps (comma separated)"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="prepTime"
          type="number"
          placeholder="Prep Time (mins)"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="difficulty"
          placeholder="Difficulty"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="cost"
          type="number"
          step="0.01"
          placeholder="Cost"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="dietaryTags"
          placeholder="Dietary Tags (comma separated)"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}
