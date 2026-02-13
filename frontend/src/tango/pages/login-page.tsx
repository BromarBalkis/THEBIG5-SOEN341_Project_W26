import React from "react";

type Props = {
  email: string;
  password: string;
  loading: boolean;
  status: string;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onLogin: (email: string, password: string) => void | Promise<void>;
};

export default function LoginPage({
  email,
  password,
  loading,
  status,
  onEmailChange,
  onPasswordChange,
  onLogin,
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => onEmailChange(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
      />
      <button disabled={loading}>{loading ? "Logging in..." : "Sign In"}</button>
      {status && <div>{status}</div>}
    </form>
  );
}
