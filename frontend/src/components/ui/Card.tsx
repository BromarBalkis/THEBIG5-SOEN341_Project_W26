import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  className = '',
  hover = false,
  onClick,
  padding = 'md',
}: CardProps) {
  const paddingClasses: Record<string, string> = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseClasses = 'bg-white rounded-xl shadow-card';
  const hoverClasses = hover
    ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer'
    : '';

  const combinedClassName = `${baseClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`.trim();

  return (
    <div onClick={onClick} className={combinedClassName}>
      {children}
    </div>
  );
}
