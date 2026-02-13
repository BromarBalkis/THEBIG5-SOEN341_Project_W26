import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

import { getToken } from "./lib/auth";

function RequireAuth({ children }: { children: React.ReactElement }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

const navClass = ({ isActive }: { isActive: boolean }) =>
  "navLink" + (isActive ? " active" : "");

export default function App() {
  return (
    <div className="container">
      <div className="nav">
        <NavLink className={navClass} to="/login">
          Login
        </NavLink>
        <NavLink className={navClass} to="/register">
          Register
        </NavLink>
        <NavLink className={navClass} to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink className={navClass} to="/profile">
          Profile
        </NavLink>
      </div>

      <div className="page">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
