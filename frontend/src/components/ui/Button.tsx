'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  icon,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const variantClasses: Record<string, string> = {
    primary:
      'bg-primary text-white hover:bg-primary-dark disabled:bg-gray-300',
    secondary:
      'bg-white border-2 border-primary text-primary hover:bg-primary-light',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-lg',
  };

  const baseClasses =
    'font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50';

  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClassName = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClass}
    ${className || ''}
  `.trim();

  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={combinedClassName}
    >
      {icon && !isLoading && icon}
      {isLoading && <Loader2 className="animate-spin" size={16} />}
      {children}
    </button>
  );
}
