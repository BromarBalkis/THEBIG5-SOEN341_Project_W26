import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../lib/auth";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setStatus("Logging in...");

    try {
      
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Login failed");
      }

      //this portion expects { token: "..." }
      const data: { token?: string } = await res.json();

      if (!data.token) throw new Error("No token returned from server");

      // this should store token so RequireAuth lets you in
      setToken(data.token);

      // navigate to dashboard
      nav("/dashboard", { replace: true });
    } catch (err: any) {
      setStatus(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="cardHeader">
        <div>
          <h2 className="h1">Sign In</h2>
          <p className="sub">Welcome back — log in to continue.</p>
        </div>
      </div>

      <div className="field">
        <div className="label">Email</div>
        <input
          className="input"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <div className="field">
        <div className="label">Password</div>
        <input
          className="input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>

      <button className="btn" type="button" onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Sign In"}
      </button>

      {status && <div className="status">{status}</div>}
    </div>
  );
}
