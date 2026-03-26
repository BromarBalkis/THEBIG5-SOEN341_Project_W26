"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMealPlan } from "@/context/MealPlanContext";
import Link from "next/link";
import { CalendarDays, BookOpen, Plus, ShoppingCart, ArrowRight, UtensilsCrossed } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function DashboardPage() {
  const { currentUser, isLoading } = useAuth();
  const { mealPlan } = useMealPlan();
  const [recipeCount, setRecipeCount] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${API_URL}/api/recipes`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setRecipeCount(data.length); })
      .catch(() => {});
  }, []);

  if (isLoading) return null;

  const mealsThisWeek = mealPlan?.entries.length ?? 0;

  const stats = [
    {
      label: "Meals This Week",
      value: mealsThisWeek,
      icon: CalendarDays,
      href: "/meal-planner",
      linkLabel: "View Planner",
      color: "text-green-700",
      bg: "bg-green-100",
      border: "border-green-100",
      gradient: "bg-gradient-to-br from-green-50 to-emerald-50",
    },
    {
      label: "My Recipes",
      value: recipeCount ?? "—",
      icon: BookOpen,
      href: "/recipes",
      linkLabel: "View Recipes",
      color: "text-blue-700",
      bg: "bg-blue-100",
      border: "border-blue-100",
      gradient: "bg-gradient-to-br from-blue-50 to-indigo-50",
    },
  ];

  const actions = [
    { href: "/meal-planner", icon: CalendarDays, label: "Plan This Week", description: "Schedule your meals for the week", color: "text-green-700", bg: "bg-green-100", hover: "group-hover:bg-green-100 group-hover:text-green-700" },
    { href: "/recipes/create", icon: Plus, label: "Add Recipe", description: "Save a new recipe to your collection", color: "text-blue-700", bg: "bg-blue-100", hover: "group-hover:bg-blue-100 group-hover:text-blue-700" },
    { href: "/grocery-list", icon: ShoppingCart, label: "Grocery List", description: "Manage your shopping list", color: "text-orange-700", bg: "bg-orange-100", hover: "group-hover:bg-orange-100 group-hover:text-orange-700" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 space-y-10">

      {/* Header */}
      <div className="border-b border-gray-100 pb-8">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Dashboard</p>
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back, {currentUser?.username ?? "there"}
        </h1>
        <p className="text-base text-gray-500 mt-2">Here's an overview of your meal planning activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stats.map(({ label, value, icon: Icon, href, linkLabel, color, bg, border, gradient }) => (
          <Link key={label} href={href} className={`${gradient} rounded-2xl border ${border} shadow-sm p-8 flex items-center gap-6 hover:shadow-md transition-all group`}>
            <div className={`${bg} ${color} p-4 rounded-xl shrink-0`}>
              <Icon size={28} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-5xl font-bold text-gray-900 leading-none">{value}</p>
              <p className="text-base text-gray-600 mt-2">{label}</p>
            </div>
            <ArrowRight size={18} className="shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {actions.map(({ href, icon: Icon, label, description, color, bg, hover }) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-all group"
            >
              <div className={`${bg} ${color} ${hover} p-3 rounded-xl transition-colors shrink-0`}>
                <Icon size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold text-gray-800">{label}</p>
                <p className="text-sm text-gray-400 mt-1 leading-snug">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Empty state nudge */}
      {recipeCount === 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex items-center gap-4">
          <UtensilsCrossed size={20} className="text-amber-500 shrink-0" />
          <p className="text-sm text-amber-700">
            You have no recipes yet.{" "}
            <Link href="/recipes/create" className="font-semibold underline underline-offset-2">
              Create your first recipe
            </Link>{" "}
            to start planning meals.
          </p>
        </div>
      )}
    </div>
  );
}
