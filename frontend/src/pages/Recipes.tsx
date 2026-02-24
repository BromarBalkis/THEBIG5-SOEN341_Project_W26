import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteRecipe, listRecipes, Recipe } from "../lib/api";

export default function Recipes() {
  const [items, setItems] = useState<Recipe[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [q, setQ] = useState("");
  const [timeMax, setTimeMax] = useState("");
  const [costMax, setCostMax] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [tag, setTag] = useState("");

  async function load() {
    setLoading(true);
    setStatus("");
    try {
      const data = await listRecipes({
        q: q.trim() || undefined,
        timeMax: timeMax.trim() || undefined,
        costMax: costMax.trim() || undefined,
        difficulty: difficulty || undefined,
        tag: tag.trim() || undefined,
      });
      setItems(data);
      if (data.length === 0) setStatus("No recipes found.");
    } catch (e: any) {
      setStatus(e.message || "Failed to load recipes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onDelete(id: string) {
    if (!confirm("Delete this recipe?")) return;
    try {
      await deleteRecipe(id);
      setItems((prev) => prev.filter((r) => r.id !== id));
    } catch (e: any) {
      alert(e.message || "Delete failed");
    }
  }

  return (
    <div className="card">
      <div className="cardHeader" style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h2 className="h1">Recipes</h2>
          <p className="sub">Search and filter your recipes.</p>
        </div>
        <Link className="btn" to="/recipes/new">
          + New Recipe
        </Link>
      </div>

      <div className="field">
        <div className="label">Search</div>
        <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. chicken..." />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
        <div className="field">
          <div className="label">Max Time (min)</div>
          <input className="input" value={timeMax} onChange={(e) => setTimeMax(e.target.value)} />
        </div>

        <div className="field">
          <div className="label">Max Cost</div>
          <input className="input" value={costMax} onChange={(e) => setCostMax(e.target.value)} />
        </div>

        <div className="field">
          <div className="label">Difficulty</div>
          <select className="input" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Any</option>
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>
        </div>

        <div className="field">
          <div className="label">Dietary Tag</div>
          <input className="input" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="HALAL, VEGAN..." />
        </div>
      </div>

      <button className="btn" type="button" onClick={load} disabled={loading}>
        {loading ? "Loading..." : "Apply"}
      </button>

      {status && <div className="status">{status}</div>}

      <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
        {items.map((r) => (
          <div key={r.id} className="card" style={{ padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{r.title}</div>
                <div className="sub">
                  {r.prepTimeMin} min • {r.difficulty} • ${Number(r.cost).toFixed(2)} • Tags:{" "}
                  {r.dietaryTags?.length ? r.dietaryTags.join(", ") : "None"}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <Link className="btn" to={`/recipes/${r.id}/edit`}>
                  Edit
                </Link>
                <button className="btn" type="button" onClick={() => onDelete(r.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}