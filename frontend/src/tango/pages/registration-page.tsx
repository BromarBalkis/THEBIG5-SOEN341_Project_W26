import { useState } from "react";

export default function RegistrationPage({
  onRegister,
}: {
  onRegister: (email: string, password: string) => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Creating account...");
    try {
      await onRegister(email, password);
      setStatus("Account created! Redirecting...");
    } catch (err: any) {
      setStatus(err?.message || "Register failed");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Register</h1>
      <p>(Tango register UI not generated yet — placeholder)</p>

      <form onSubmit={submit}>
        <label>Email</label>
        <br />
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <br /><br />

        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Create account</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}
