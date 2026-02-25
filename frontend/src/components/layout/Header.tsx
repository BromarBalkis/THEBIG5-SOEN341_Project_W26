"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Bell, Search, LogOut, ChevronDown, User } from "lucide-react";
import { getInitials } from "@/lib/utils";

export function Header() {
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md shadow-sm border-b border-primary-light flex items-center justify-between px-6">
      {/* LEFT SECTION */}
      <Link href="/dashboard" className="flex items-center gap-2">
        <div className="text-xl font-bold text-primary-dark tracking-tight">
          MealMajor
        </div>{" "}
      </Link>

      {/* CENTER SECTION */}
      <div className="hidden md:flex relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search recipes..."
          className="pl-10 h-10 bg-primary-light/40 rounded-xl border border-primary-light outline-none text-sm w-64 focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3">
        {/* BELL ICON */}
        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
          <Bell size={20} />
        </button>

        {/* USER DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-lg transition"
          >
            <div className="w-9 h-9 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center">
              {getInitials(currentUser?.fullName || "User")}
            </div>

            <div className="hidden md:block text-sm font-medium text-gray-700">
              {currentUser?.username || "User"}
            </div>

            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User size={16} />
                Profile
              </Link>

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
