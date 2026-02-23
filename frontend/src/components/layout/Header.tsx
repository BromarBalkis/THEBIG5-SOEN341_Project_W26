'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Bell, Search, LogOut, ChevronDown } from 'lucide-react';
import { getInitials } from '@/lib/utils';

export function Header() {
  const { currentUser, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* LEFT SECTION */}
      <Link href="/dashboard" className="flex items-center gap-2">
        <div className="text-xl font-bold text-primary">MealMajor</div>
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
          className="pl-10 h-10 bg-gray-100 rounded-lg border-none outline-none text-sm w-64"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3">
        {/* BELL ICON */}
        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
          <Bell size={20} />
        </button>

        {/* USER SECTION */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center">
            {getInitials(currentUser?.fullName || 'User')}
          </div>
          <div className="hidden md:block text-sm font-medium text-gray-700">
            {currentUser?.username}
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => logout()}
          className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
