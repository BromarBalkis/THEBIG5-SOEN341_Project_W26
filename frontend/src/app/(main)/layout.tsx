"use client";

import { Header } from "@/components/layout/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Proper Header */}
      <Header />

      {/* Push content below fixed header */}
      <main className="pt-20 px-6">{children}</main>
    </div>
  );
}
