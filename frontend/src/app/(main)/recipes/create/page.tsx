"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Clock,
  DollarSign,
  Flame,
  Dumbbell,
  Wheat,
  Droplets,
  Plus,
  Trash2,
  ChevronLeft,
  AlignLeft,
  UtensilsCrossed,
  ListOrdered,
  Leaf,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const DIETARY_TAGS = [
  "Vegetarian",
  "Vegan",
  "Keto",
  "Paleo",
  "Gluten-Free",
  "Dairy-Free",
  "Low-Carb",
  "Halal",
  "Kosher",
];

const UNITS = ["g", "kg", "ml", "L", "cup", "tbsp", "tsp", "piece", "slice", "clove", "pinch"];

interface Ingredient {
  id: string;
  amount: string;
  unit: string;
  name: string;
}

interface Step {
  id: string;
  description: string;
}

/* ── shared card wrapper ── */
function Section({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/60">
        <div className="p-1.5 rounded-lg bg-green-100 text-green-700">{icon}</div>
        <div>
          <h2 className="text-sm font-bold text-gray-800">{title}</h2>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ── shared field label ── */
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  );
}

/* ── shared text input style ── */
const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-colors bg-white";

export default function CreateRecipePage() {
  const router = useRouter();
  const { showToast } = useToast();

  /* ── form state ── */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [cost, setCost] = useState("");
  const [nutritionCalories, setNutritionCalories] = useState("");
  const [nutritionProtein, setNutritionProtein] = useState("");
  const [nutritionCarbs, setNutritionCarbs] = useState("");
  const [nutritionFat, setNutritionFat] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: "1", amount: "", unit: "g", name: "" },
  ]);

  const [steps, setSteps] = useState<Step[]>([{ id: "1", description: "" }]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ── ingredient helpers ── */
  function addIngredient() {
    setIngredients((prev) => [
      ...prev,
      { id: Date.now().toString(), amount: "", unit: "g", name: "" },
    ]);
  }

  function removeIngredient(id: string) {
    setIngredients((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));
  }

  function updateIngredient(id: string, field: keyof Ingredient, value: string) {
    setIngredients((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  }

  /* ── step helpers ── */
  function addStep() {
    setSteps((prev) => [...prev, { id: Date.now().toString(), description: "" }]);
  }

  function removeStep(id: string) {
    setSteps((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev));
  }

  function updateStep(id: string, value: string) {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, description: value } : s)));
  }

  /* ── tag toggle ── */
  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  /* ── submit ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      showToast("Recipe title is required", "error");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim() || undefined,
      ingredients: ingredients
        .filter((i) => i.name.trim())
        .map((i) => `${i.amount} ${i.unit} ${i.name}`.trim()),
      steps: steps.filter((s) => s.description.trim()).map((s) => s.description.trim()),
      prepTime: Number(prepTime) || 0,
      difficulty: difficulty || "Easy",
      cost: Number(cost) || 0,
      dietaryTags: selectedTags,
      nutritionCalories: nutritionCalories ? Number(nutritionCalories) : null,
      nutritionProtein: nutritionProtein ? Number(nutritionProtein) : null,
      nutritionCarbs: nutritionCarbs ? Number(nutritionCarbs) : null,
      nutritionFat: nutritionFat ? Number(nutritionFat) : null,
    };

    const token = localStorage.getItem("token");

    if (!token) {
      // Demo mode — no backend
      showToast("Recipe saved! (demo mode)", "success");
      router.push("/recipes");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast("Recipe created!", "success");
        router.push("/recipes");
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.message ?? "Failed to create recipe", "error");
      }
    } catch {
      showToast("Could not reach the server", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  /* ── render ── */
  return (
    <div className="max-w-3xl mx-auto py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Recipe</h1>
          <p className="text-sm text-gray-500 mt-0.5">Fill in the details for your new recipe</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ── Basic Info ── */}
        <Section icon={<BookOpen size={16} />} title="Basic Info" subtitle="Name, description and key details">
          <div className="space-y-4">
            <div>
              <Label required>Recipe Name</Label>
              <input
                className={inputCls}
                placeholder="e.g. Creamy Avocado Pasta"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Description</Label>
              <textarea
                className={`${inputCls} resize-none`}
                rows={3}
                placeholder="Briefly describe the dish, its flavour, or when to serve it…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label required>Prep Time</Label>
                <div className="relative">
                  <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    className={`${inputCls} pl-9`}
                    placeholder="30"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">min</span>
                </div>
              </div>

              <div>
                <Label required>Difficulty</Label>
                <select
                  className={inputCls}
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  required
                >
                  <option value="" disabled>Select…</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <Label>Cost per Serving</Label>
                <div className="relative">
                  <DollarSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className={`${inputCls} pl-9`}
                    placeholder="0.00"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Ingredients ── */}
        <Section
          icon={<UtensilsCrossed size={16} />}
          title="Ingredients"
          subtitle="List everything needed for this recipe"
        >
          <div className="space-y-2">
            {/* Column headers */}
            <div className="grid grid-cols-[80px_110px_1fr_36px] gap-2 mb-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Amount</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Unit</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Ingredient</span>
              <span />
            </div>

            {ingredients.map((ing) => (
              <div key={ing.id} className="grid grid-cols-[80px_110px_1fr_36px] gap-2 items-center">
                <input
                  type="number"
                  min="0"
                  step="any"
                  className={inputCls}
                  placeholder="1"
                  value={ing.amount}
                  onChange={(e) => updateIngredient(ing.id, "amount", e.target.value)}
                />
                <select
                  className={inputCls}
                  value={ing.unit}
                  onChange={(e) => updateIngredient(ing.id, "unit", e.target.value)}
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
                <input
                  className={inputCls}
                  placeholder="e.g. Chicken breast"
                  value={ing.name}
                  onChange={(e) => updateIngredient(ing.id, "name", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(ing.id)}
                  disabled={ingredients.length === 1}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Remove ingredient"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addIngredient}
              className="mt-3 flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
            >
              <Plus size={16} />
              Add Ingredient
            </button>
          </div>
        </Section>

        {/* ── Steps ── */}
        <Section
          icon={<ListOrdered size={16} />}
          title="Instructions"
          subtitle="Walk through each step of the recipe"
        >
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center mt-2">
                  {index + 1}
                </div>
                <textarea
                  className={`${inputCls} flex-1 resize-none`}
                  rows={2}
                  placeholder={`Step ${index + 1}…`}
                  value={step.description}
                  onChange={(e) => updateStep(step.id, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeStep(step.id)}
                  disabled={steps.length === 1}
                  className="mt-2 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Remove step"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addStep}
              className="flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
            >
              <Plus size={16} />
              Add Step
            </button>
          </div>
        </Section>

        {/* ── Dietary Tags ── */}
        <Section
          icon={<Leaf size={16} />}
          title="Dietary Tags"
          subtitle="Select all that apply"
        >
          <div className="flex flex-wrap gap-2">
            {DIETARY_TAGS.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    active
                      ? "bg-green-600 text-white border-green-600 shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700"
                  }`}
                >
                  {active && <span className="mr-1">✓</span>}
                  {tag}
                </button>
              );
            })}
          </div>
          {selectedTags.length > 0 && (
            <p className="mt-3 text-xs text-gray-500">
              {selectedTags.length} tag{selectedTags.length !== 1 ? "s" : ""} selected
            </p>
          )}
        </Section>

        {/* ── Nutrition ── */}
        <Section
          icon={<AlignLeft size={16} />}
          title="Nutrition Info"
          subtitle="Optional — shown in the macro breakdown charts"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <Label>Calories</Label>
              <div className="relative">
                <Flame size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
                <input
                  type="number"
                  min="0"
                  className={`${inputCls} pl-9`}
                  placeholder="0"
                  value={nutritionCalories}
                  onChange={(e) => setNutritionCalories(e.target.value)}
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">kcal</span>
              </div>
            </div>

            <div>
              <Label>Protein</Label>
              <div className="relative">
                <Dumbbell size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  type="number"
                  min="0"
                  className={`${inputCls} pl-9`}
                  placeholder="0"
                  value={nutritionProtein}
                  onChange={(e) => setNutritionProtein(e.target.value)}
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">g</span>
              </div>
            </div>

            <div>
              <Label>Carbs</Label>
              <div className="relative">
                <Wheat size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  type="number"
                  min="0"
                  className={`${inputCls} pl-9`}
                  placeholder="0"
                  value={nutritionCarbs}
                  onChange={(e) => setNutritionCarbs(e.target.value)}
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">g</span>
              </div>
            </div>

            <div>
              <Label>Fat</Label>
              <div className="relative">
                <Droplets size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400" />
                <input
                  type="number"
                  min="0"
                  className={`${inputCls} pl-9`}
                  placeholder="0"
                  value={nutritionFat}
                  onChange={(e) => setNutritionFat(e.target.value)}
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">g</span>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Actions ── */}
        <div className="flex items-center justify-between pt-1 pb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-7 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            {isSubmitting ? "Saving…" : "Create Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
}
