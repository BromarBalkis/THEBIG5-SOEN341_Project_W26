import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearToken } from "../lib/auth";

const navClass = ({ isActive }: { isActive: boolean }) =>
  "navLink" + (isActive ? " active" : "");

export default function HomeLayout() {
  const nav = useNavigate();

  function logout() {
    clearToken();
    nav("/login", { replace: true });
  }

  return (
    <div className="container">
      <div className="nav">
        <div className="navLeft">
          <NavLink className={navClass} to="/home/dashboard">
            Dashboard
          </NavLink>
          <NavLink className={navClass} to="/home/recipes">
            Recipes
          </NavLink>
        </div>

        <button
          className="btn btnSmall"
          type="button"
          onClick={logout}
          style={{ marginLeft: "auto" }}
        >
          Logout
        </button>
      </div>

      <div className="page">
        <div className="contentWrapper"></div>
        <Outlet />
      </div>
    </div>
  );
}