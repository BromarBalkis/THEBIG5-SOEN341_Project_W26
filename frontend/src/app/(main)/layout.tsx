"use client";

import { Header } from "@/components/layout/Header";
import { MealPlanProvider } from "@/context/MealPlanContext";
import { useAuth } from "@/context/AuthContext";

function MainLayoutInner({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <MealPlanProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 px-6">{children}</main>
      </div>
    </MealPlanProvider>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <MainLayoutInner>{children}</MainLayoutInner>;
}
