"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Clock, DollarSign, Flame } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

const numericFields = ["prepTime", "cost", "nutritionCalories", "nutritionProtein", "nutritionCarbs", "nutritionFat"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white";

export default function EditRecipePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/recipes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => { setRecipe(data); setLoading(false); })
      .catch(() => { router.push("/recipes"); });
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!recipe) return;
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: numericFields.includes(name) ? (value === "" ? null : Number(value)) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(recipe),
    });
    setSaving(false);
    if (res.ok) {
      router.push("/recipes");
    } else {
      setError("Failed to save changes. Please try again.");
    }
  };

  if (loading || !recipe) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 flex items-center justify-center text-gray-400 text-sm">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/recipes")}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Recipe</h1>
          <p className="text-sm text-gray-400 mt-0.5">{recipe.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">Basic Info</h2>

          <Field label="Title">
            <input
              type="text"
              name="title"
              value={recipe.title}
              onChange={handleChange}
              required
              className={inputCls}
            />
          </Field>

          <Field label="Description">
            <textarea
              name="description"
              value={recipe.description || ""}
              onChange={handleChange}
              rows={3}
              className={inputCls + " resize-none"}
            />
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Prep Time (min)">
              <div className="relative">
                <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="prepTime"
                  min="0"
                  value={recipe.prepTime}
                  onChange={handleChange}
                  required
                  className={inputCls + " pl-8"}
                />
              </div>
            </Field>

            <Field label="Difficulty">
              <select
                name="difficulty"
                value={recipe.difficulty}
                onChange={handleChange}
                className={inputCls}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </Field>

            <Field label="Cost ($)">
              <div className="relative">
                <DollarSign size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="cost"
                  min="0"
                  step="0.01"
                  value={recipe.cost}
                  onChange={handleChange}
                  required
                  className={inputCls + " pl-8"}
                />
              </div>
            </Field>
          </div>
        </div>

        {/* Nutrition */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Flame size={15} className="text-orange-400" />
            <h2 className="text-sm font-semibold text-gray-700">Nutrition <span className="text-gray-400 font-normal">(optional)</span></h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Calories (kcal)">
              <input type="number" name="nutritionCalories" min="0" value={recipe.nutritionCalories ?? ""} onChange={handleChange} className={inputCls} />
            </Field>
            <Field label="Protein (g)">
              <input type="number" name="nutritionProtein" min="0" value={recipe.nutritionProtein ?? ""} onChange={handleChange} className={inputCls} />
            </Field>
            <Field label="Carbs (g)">
              <input type="number" name="nutritionCarbs" min="0" value={recipe.nutritionCarbs ?? ""} onChange={handleChange} className={inputCls} />
            </Field>
            <Field label="Fat (g)">
              <input type="number" name="nutritionFat" min="0" value={recipe.nutritionFat ?? ""} onChange={handleChange} className={inputCls} />
            </Field>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/recipes")}
            className="px-5 py-2 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
