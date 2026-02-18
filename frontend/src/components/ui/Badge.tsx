import React from 'react';

interface BadgeProps {
  label: string;
  variant: 'dietary' | 'difficulty' | 'cost' | 'status';
  value?: string;
}

function getColorClasses(
  variant: BadgeProps['variant'],
  value?: string
): string {
  if (variant === 'difficulty') {
    switch (value) {
      case 'Easy':
        return 'bg-green-100 text-green-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  if (variant === 'cost') {
    switch (value) {
      case '$':
        return 'bg-green-100 text-green-700';
      case '$$':
        return 'bg-yellow-100 text-yellow-700';
      case '$$$':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  if (variant === 'dietary') {
    return 'bg-primary-light text-primary-dark';
  }

  return 'bg-gray-100 text-gray-700';
}

export function Badge({ label, variant, value }: BadgeProps) {
  const colorClasses = getColorClasses(variant, value);
  const baseClasses =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      {label}
    </span>
  );
}
