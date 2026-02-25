"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import type { User, RegisterData } from "@/types";

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login(email: string, password: string): Promise<boolean>;
  register(data: RegisterData): Promise<boolean>;
  logout(): void;
  updateProfile(data: Partial<User>): void;
}

const STORAGE_KEY = "mealmajor_user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    async function fetchUser() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Invalid token");
        }

        const user = await response.json();
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem("token");
        document.cookie = "mealmajor_authenticated=; path=/; max-age=0";
        setCurrentUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          },
        );

        if (!response.ok) {
          return false;
        }

        const data = await response.json();

        // Save JWT
        localStorage.setItem("token", data.token);
        document.cookie = "mealmajor_authenticated=true; path=/";

        // FETCH USER IMMEDIATELY
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          },
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user");
        }

        const user = await userResponse.json();

        setCurrentUser(user);
        setIsAuthenticated(true);

        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
    [],
  );

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      return true; // success → redirect to login
    } catch (error) {
      console.error(error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    document.cookie = "mealmajor_authenticated=; path=/; max-age=0";

    setCurrentUser(null);
    setIsAuthenticated(false);

    window.location.href = "/login"; // force redirect
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const updatedUser = await response.json();
    setCurrentUser(updatedUser);
  }, []);

  const value: AuthContextType = {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
