"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function DashboardPage() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return null;

  console.log("Current user:", currentUser);
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {currentUser?.username} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">Dashboard is working!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl shadow-sm hover:shadow-md transition border p-6">
          <p className="text-4xl font-bold text-primary tracking-tight">7</p>
          <p className="text-sm text-gray-500 mt-1">Meals Planned</p>
          <Link
            href="/meal-planner"
            className="text-sm text-primary hover:underline mt-3 inline-block"
          >
            View Planner →
          </Link>
        </div>

        <div className="bg-card rounded-xl shadow-sm hover:shadow-md transition border p-6">
          <p className="text-4xl font-bold text-primary tracking-tight">6</p>
          <p className="text-sm text-gray-500 mt-1">Recipes Saved</p>
          <Link
            href="/recipes"
            className="text-sm text-primary hover:underline mt-3 inline-block"
          >
            View Recipes →
          </Link>
        </div>

        <div className="bg-card rounded-xl shadow-sm hover:shadow-md transition border p-6">
          <p className="text-4xl font-bold text-primary tracking-tight">12</p>
          <p className="text-sm text-gray-500 mt-1">Grocery Items</p>
          <Link
            href="/grocery-list"
            className="text-sm text-primary hover:underline mt-3 inline-block"
          >
            View List →
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/meal-planner"
            className="p-4 border rounded-lg text-center transition hover:border-primary hover:bg-primary/5 hover:shadow-md"
          >
            <p className="text-3xl mb-2">📅</p>
            <p className="font-semibold">Plan This Week</p>
          </Link>

          <Link
            href="/recipes/create"
            className="p-4 border rounded-lg text-center transition hover:border-primary hover:bg-primary/5 hover:shadow-md"
          >
            <p className="text-3xl mb-2">🍳</p>
            <p className="font-semibold">Add Recipe</p>
          </Link>

          <Link
            href="/grocery-list"
            className="p-4 border rounded-lg text-center transition hover:border-primary hover:bg-primary/5 hover:shadow-md"
          >
            <p className="text-3xl mb-2">🛒</p>
            <p className="font-semibold">Grocery List</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
