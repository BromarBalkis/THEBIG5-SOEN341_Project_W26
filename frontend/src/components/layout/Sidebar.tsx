'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  ChefHat,
  Calendar,
  ShoppingCart,
  User,
} from 'lucide-react';
import { getInitials } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/recipes', icon: ChefHat, label: 'Recipes' },
  { href: '/meal-planner', icon: Calendar, label: 'Meal Planner' },
  { href: '/grocery-list', icon: ShoppingCart, label: 'Grocery List' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { currentUser } = useAuth();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-60 bg-gray-50 border-r border-gray-200 flex flex-col z-40 hidden md:flex">
      {/* TOP SECTION - User Info */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center">
          {getInitials(currentUser?.fullName || 'User')}
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">
            {currentUser?.fullName}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {currentUser?.email}
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION - Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive
                  ? 'flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 font-semibold bg-primary-light text-primary border-l-4 border-primary'
                  : 'flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors'
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM SECTION */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-400 text-center">
        MealMajor v1.0.0
      </div>
    </aside>
  );
}
