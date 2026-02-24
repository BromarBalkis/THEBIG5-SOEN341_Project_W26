import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeLayout from "./pages/HomeLayout";
import Dashboard from "./pages/Dashboard";
import Recipes from "./pages/Recipes";
import RecipeNew from "./pages/RecipeNew";
import RecipeEdit from "./pages/RecipeEdit";

import { getToken } from "./lib/auth";

function RequireAuth({ children }: { children: React.ReactElement }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />; // ✅ fixed
  return children;
}

function RedirectIfAuthed({ children }: { children: React.ReactElement }) {
  const token = getToken();
  if (token) return <Navigate to="/home" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public */}
      <Route
        path="/login"
        element={
          <RedirectIfAuthed>
            <Login />
          </RedirectIfAuthed>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectIfAuthed>
            <Register />
          </RedirectIfAuthed>
        }
      />

      {/* aliases (prevents fallback to dashboard) */}
      <Route path="/dashboard" element={<Navigate to="/home/dashboard" replace />} />
      <Route path="/recipes" element={<Navigate to="/home/recipes" replace />} />
      <Route path="/recipes/new" element={<Navigate to="/home/recipes/new" replace />} />
      <Route path="/recipes/:id/edit" element={<Navigate to="/home/recipes/:id/edit" replace />} />

      {/* Private under /home */}
      <Route
        path="/home"
        element={
          <RequireAuth>
            <HomeLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/new" element={<RecipeNew />} />
        <Route path="recipes/:id/edit" element={<RecipeEdit />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}