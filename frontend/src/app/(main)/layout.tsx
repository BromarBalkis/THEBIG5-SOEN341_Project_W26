"use client";

import { Header } from "@/components/layout/Header";
import { MealPlanProvider } from "@/context/MealPlanContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MealPlanProvider>
      <div className="min-h-screen bg-background">
        {/* Proper Header */}
        <Header />

        {/* Push content below fixed header */}
        <main className="pt-20 px-6">{children}</main>
      </div>
    </MealPlanProvider>
  );
}
