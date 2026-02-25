import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { AppProvider } from "@/context/AppContext";
import { ToastProvider } from "@/context/ToastContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MealMajor - Meal Prep & Healthy Living",
  description: "Plan your meals, track groceries, and discover easy recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-primary">
        <ToastProvider>
          <AuthProvider>
            <AppProvider>{children}</AppProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
