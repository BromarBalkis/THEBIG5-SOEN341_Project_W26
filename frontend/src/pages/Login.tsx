export default function Login() {
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
        <input className="input" placeholder="you@email.com" />
      </div>

      <div className="field">
        <div className="label">Password</div>
        <input className="input" type="password" placeholder="••••••••" />
      </div>

      <button className="btn" type="button">Sign In</button>

      {/* <div className="status">Message here</div> */}
    </div>
  );
}
