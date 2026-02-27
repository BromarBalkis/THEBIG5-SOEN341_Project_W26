'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  required,
  className,
  ...props
}: InputProps) {
  const baseInputClasses =
    'w-full h-12 border rounded-lg text-base outline-none transition-colors duration-200 bg-white text-gray-900 placeholder:text-gray-400';

  const borderClasses = error
    ? 'border-red-500 focus:ring-2 focus:ring-red-100'
    : 'border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-light';

  const paddingClasses = leftIcon && rightIcon ? 'px-10' : leftIcon ? 'pl-10 px-4' : rightIcon ? 'pr-10 px-4' : 'px-4';

  const inputClasses = `${baseInputClasses} ${borderClasses} ${paddingClasses} ${className || ''}`.trim();

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input {...props} className={inputClasses} required={required} />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}
