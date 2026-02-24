import { useState } from "react";
import type { Difficulty, Recipe } from "../lib/api";

type FormData = Omit<Recipe, "id" | "createdAt" | "updatedAt">;

export default function RecipeForm({
  initial,
  onSubmit,
  submitLabel,
}: {
  initial: FormData;
  onSubmit: (data: FormData) => Promise<void>;
  submitLabel: string;
}) {
  const [data, setData] = useState<FormData>(initial);

  const [ingredientsInput, setIngredientsInput] = useState(
    initial.ingredients.join(", ")
  );
  const [tagsInput, setTagsInput] = useState(
    initial.dietaryTags.join(", ")
  );

  const [prepInput, setPrepInput] = useState(
    initial.prepTimeMin ? String(initial.prepTimeMin) : ""
  );
  const [costInput, setCostInput] = useState(
    initial.cost ? String(initial.cost) : ""
  );

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((p) => ({ ...p, [key]: value }));

  async function handle() {
    setLoading(true);
    setStatus("Saving...");

    try {
      const cleanedIngredients = ingredientsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const cleanedTags = tagsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const prepTimeMin = prepInput === "" ? NaN : Number(prepInput);
      const cost = costInput === "" ? NaN : Number(costInput);

      if (!data.title.trim()) throw new Error("Title is required");
      if (!cleanedIngredients.length) throw new Error("At least 1 ingredient is required");
      if (!data.steps.trim()) throw new Error("Steps are required");
      if (!Number.isFinite(prepTimeMin) || prepTimeMin < 0)
        throw new Error("Prep Time must be a number ≥ 0");
      if (!Number.isFinite(cost) || cost < 0)
        throw new Error("Cost must be a number ≥ 0");

      await onSubmit({
        ...data,
        ingredients: cleanedIngredients,
        dietaryTags: cleanedTags,
        prepTimeMin: Math.floor(prepTimeMin),
        cost,
      });

      setStatus("Saved");
    } catch (e: any) {
      setStatus(e.message || "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="field">
        <div className="label">Title</div>
        <input
          className="input"
          value={data.title}
          onChange={(e) => set("title", e.target.value)}
        />
      </div>

      <div className="field">
        <div className="label">Ingredients (comma separated)</div>
        <input
          className="input"
          value={ingredientsInput}
          onChange={(e) => setIngredientsInput(e.target.value)}
        />
      </div>

      <div className="field">
        <div className="label">Steps</div>
        <textarea
          className="input"
          style={{ minHeight: 120 }}
          value={data.steps}
          onChange={(e) => set("steps", e.target.value)}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
        <div className="field">
          <div className="label">Prep Time (min)</div>
          <input
            className="input"
            inputMode="numeric"
            value={prepInput}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d+$/.test(v)) setPrepInput(v);
            }}
          />
        </div>

        <div className="field">
          <div className="label">Difficulty</div>
          <select
            className="input"
            value={data.difficulty}
            onChange={(e) =>
              set("difficulty", e.target.value as Difficulty)
            }
          >
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>
        </div>

        <div className="field">
          <div className="label">Cost</div>
          <input
            className="input"
            inputMode="decimal"
            value={costInput}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d*\.?\d*$/.test(v)) setCostInput(v);
            }}
          />
        </div>

        <div className="field">
          <div className="label">Dietary Tags (comma separated)</div>
          <input
            className="input"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </div>
      </div>

      <button
        className="btn"
        type="button"
        onClick={handle}
        disabled={loading}
      >
        {loading ? "Saving..." : submitLabel}
      </button>

      {status && <div className="status">{status}</div>}
    </div>
  );
}