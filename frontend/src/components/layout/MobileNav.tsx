'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ChefHat,
  Calendar,
  ShoppingCart,
  User,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/recipes', icon: ChefHat, label: 'Recipes' },
  { href: '/meal-planner', icon: Calendar, label: 'Meal Planner' },
  { href: '/grocery-list', icon: ShoppingCart, label: 'Grocery List' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 flex items-center justify-around h-16 px-2">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + '/');
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-0.5"
          >
            <Icon
              size={22}
              className={
                isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
              }
            />
            <span
              className={`text-xs font-medium ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
