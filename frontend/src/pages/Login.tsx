import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../lib/api";
import { setToken } from "../lib/auth";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setStatus("");

    try {
      const token = await login(email, password); // returns token string
      setToken(token);
      nav("/home", { replace: true });
    } catch (e: any) {
      setStatus(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

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
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="field">
        <div className="label">Password</div>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn" type="button" onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Sign In"}
      </button>

      <Link className="btn" to="/register" style={{ marginTop: 10, display: "inline-block" }}>
        Register
      </Link>

      {status && <div className="status">{status}</div>}
    </div>
  );
}