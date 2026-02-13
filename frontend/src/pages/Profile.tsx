export default function Profile() {
  return (
    <div className="card">
      <div className="cardHeader">
        <div>
          <h2 className="h1">Profile</h2>
          <p className="sub">Manage your account details.</p>
        </div>
      </div>

      <div className="field">
        <div className="label">Full Name</div>
        <input className="input" placeholder="Your name" />
      </div>

      <div className="field">
        <div className="label">Email</div>
        <input className="input" placeholder="you@email.com" />
      </div>

      <button className="btn" type="button">Save Changes</button>
    </div>
  );
}
