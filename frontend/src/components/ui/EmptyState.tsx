import { Button } from './Button';

interface EmptyStateProps {
  emoji: string;
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({
  emoji,
  title,
  subtitle,
  action,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
      {action && (
        <Button
          onClick={action.onClick}
          variant="primary"
          className="mt-6"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
