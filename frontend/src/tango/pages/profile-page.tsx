type Props = {
  status: string;
  user: null | { email?: string; id?: string; createdAt?: string };
};

export default function ProfilePage({ status, user }: Props) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Profile</h1>
      <p>{status}</p>

      {user ? (
        <div>
          <div>Email: {user.email}</div>
          <div>User ID: {user.id}</div>
          <div>Created: {user.createdAt}</div>
        </div>
      ) : (
        <p>Loading user…</p>
      )}
    </div>
  );
}
