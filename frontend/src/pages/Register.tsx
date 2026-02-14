import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
// We need to remember to update this if our backend endpoint is different
const REGISTER_URL = `${BASE_URL}/auth/register`;

export default function Register() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("");

    if (!name || !email || !password) {
      setStatus("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = data?.message || data?.error || `Register failed (${res.status})`;
        setStatus(msg);
        console.error("Register error:", { status: res.status, data });
        return;
      }

      // Here If backend returns token on register, then we can store it.
      // If not, just navigate to login.
      setStatus("Account created. Redirecting to login...");
      setTimeout(() => nav("/login"), 600);
    } catch (err: any) {
      console.error("Register exception:", err);
      setStatus(err?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="cardHeader">
        <div>
          <h2 className="h1">Register</h2>
          <p className="sub">Create an account to get started.</p>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="field">
          <div className="label">Name</div>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>

        <div className="field">
          <div className="label">Email</div>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>

        <div className="field">
          <div className="label">Password</div>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>

        <button className="btn" disabled={loading} type="submit">
          {loading ? "Creating..." : "Create Account"}
        </button>

        {status && <div className="status">{status}</div>}
      </form>
    </div>
  );
}
