import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
  fullPage?: boolean;
}

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  fullPage = false,
}: LoadingSpinnerProps) {
  const sizeMap: Record<string, number> = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const colorClasses: Record<string, string> = {
    primary: 'text-primary',
    white: 'text-white',
  };

  const containerClasses = fullPage
    ? 'min-h-screen flex items-center justify-center'
    : 'flex items-center justify-center';

  return (
    <div className={containerClasses}>
      <Loader2
        size={sizeMap[size]}
        className={`animate-spin ${colorClasses[color]}`}
      />
    </div>
  );
}
