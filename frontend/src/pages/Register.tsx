import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    setStatus("");

    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setStatus("Account created. Now log in.");
      nav("/login", { replace: true });
    } catch (e: any) {
      setStatus(e.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="cardHeader">
        <div>
          <h2 className="h1">Register</h2>
          <p className="sub">Create your account.</p>
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

      <button className="btn" type="button" onClick={handleRegister} disabled={loading}>
        {loading ? "Creating..." : "Create Account"}
      </button>

      <Link className="btn" to="/login" style={{ marginTop: 10, display: "inline-block" }}>
        Back to Login
      </Link>

      {status && <div className="status">{status}</div>}
    </div>
  );
}